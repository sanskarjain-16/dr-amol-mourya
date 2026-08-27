import { createClient } from "npm:@supabase/supabase-js@2";
import crypto from "node:crypto";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Initialize Supabase client early for audit logging
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  let bodyText = "";
  try {
    // We must read the raw body text for HMAC signature verification
    bodyText = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const secret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET")?.trim();

    if (!signature || !secret) {
      console.error("Missing signature or secret");
      return new Response("Unauthorized: Missing credentials", { status: 401 });
    }

    // Verify HMAC SHA256 signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(bodyText)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Invalid signature mismatch");
      return new Response("Unauthorized: Invalid signature", { status: 401 });
    }

    const payload = JSON.parse(bodyText);
    const event = payload.event;
    console.log("Valid Razorpay Webhook Event:", event);

    // 1. Audit Logging
    const { error: auditError } = await supabase
      .from('payment_audit_logs')
      .insert([{ event_type: event, payload: payload }]);
      
    if (auditError) {
      console.error("Failed to write to audit log:", auditError);
      // We log but continue processing
    }

    // 2. Process payment.captured or order.paid
    if (event === "payment.captured" || event === "order.paid") {
      const payment = payload.payload.payment.entity;
      const orderId = payment.order_id;
      const paymentId = payment.id;
      const amount = payment.amount; // in paise
      const currency = payment.currency;

      // 3. Independent Validation (9700 INR)
      if (amount !== 9700 || currency !== "INR") {
        console.error(`Validation Failed: Expected 9700 INR, got ${amount} ${currency}`);
        // Return 200 so Razorpay stops retrying this invalid webhook. We already audited it.
        return new Response("Validation failed, ignoring.", { status: 200 });
      }

      if (!orderId) {
        console.error("Missing order_id in payment payload");
        return new Response("Missing order_id", { status: 200 });
      }

      // 4. Update Registration (Idempotent by checking PENDING)
      const { data, error, count } = await supabase
        .from("workshop_registrations")
        .update({
          razorpay_payment_id: paymentId,
          registration_status: 'CONFIRMED',
          payment_status: 'PAID',
          payment_completed_at: new Date().toISOString(),
        })
        .eq('razorpay_order_id', orderId)
        .eq('registration_status', 'PENDING') // Idempotency check
        .select();

      if (error) {
        console.error("Database Update Error:", error);
        // If it's a unique constraint violation (duplicate payment_id on another row), we can ignore
        if (error.code === '23505') {
           console.log("Duplicate payment webhook detected and ignored.");
           return new Response("Duplicate ignored", { status: 200 });
        }
        return new Response("Error updating database", { status: 500 });
      }

      if (data && data.length > 0) {
        console.log(`Successfully confirmed registration for order: ${orderId}`);
      } else {
        console.log(`No pending registration found for order ${orderId} (might be already processed).`);
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (err) {
    console.error("Webhook processing error:", err);
    
    // Attempt to log parsing/fatal errors if possible
    if (bodyText) {
      try {
        await supabase.from('payment_audit_logs').insert([{ event_type: 'WEBHOOK_ERROR', payload: { error: err.message, raw: bodyText } }]);
      } catch (e) { /* ignore */ }
    }
    
    return new Response("Internal Server Error", { status: 500 });
  }
});
