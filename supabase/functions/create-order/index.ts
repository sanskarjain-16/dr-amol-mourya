import { createClient } from "npm:@supabase/supabase-js@2";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { 
      name, email, phone, workshop_id, lead_source = 'organic',
      acquisition_source, utm_source, utm_medium, utm_campaign, utm_content, landing_page
    } = await req.json();

    if (!name || !email || !phone || !workshop_id) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Initialize Supabase client using Service Role Key to bypass RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Validate Workshop
    const { data: workshop, error: workshopError } = await supabase
      .from('workshops')
      .select('*')
      .eq('id', workshop_id)
      .eq('is_active', true)
      .single();

    if (workshopError || !workshop) {
      return new Response(JSON.stringify({ error: "Workshop not found or inactive" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    if (workshop.price_amount !== 9700 || workshop.price_currency !== 'INR') {
      return new Response(JSON.stringify({ error: "Invalid workshop pricing configuration" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // 2. Call Razorpay API to create order
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error("Missing Razorpay credentials");
      return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const authHeader = `Basic ${btoa(`${razorpayKeyId}:${razorpayKeySecret}`)}`;
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
      },
      body: JSON.stringify({
        amount: workshop.price_amount,
        currency: workshop.price_currency,
        receipt: `receipt_${workshop_id.slice(0, 8)}_${Date.now()}`,
      }),
    });

    const razorpayData = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      console.error("Razorpay Order Error:", razorpayData);
      return new Response(JSON.stringify({ error: "Failed to create Razorpay order" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const razorpayOrderId = razorpayData.id;

    // 3. Create PENDING registration in database
    const { data: registration, error: insertError } = await supabase
      .from('workshop_registrations')
      .insert([
        {
          name: name,
          email: email,
          phone: phone,
          workshop_id: workshop_id,
          razorpay_order_id: razorpayOrderId,
          amount_paid: workshop.price_amount,
          currency: workshop.price_currency,
          registration_status: 'PENDING',
          payment_status: 'PENDING',
          lead_source: lead_source,
          acquisition_source: acquisition_source || 'WEBSITE',
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          utm_content: utm_content || null,
          landing_page: landing_page || null,
        }
      ])
      .select('registration_id')
      .single();

    if (insertError) {
      console.error("Database Insert Error:", insertError);
      return new Response(JSON.stringify({ error: "Failed to create registration record" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // 4. Return order ID to client
    return new Response(JSON.stringify({
      order_id: razorpayOrderId,
      registration_id: registration.registration_id,
      amount: workshop.price_amount,
      currency: workshop.price_currency,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (err) {
    console.error("Create Order Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
