import { createClient } from "npm:@supabase/supabase-js@2";

const allowedProductionOrigins = [
  'https://www.dramolmourya.com',
  'https://dramolmourya.com'
];

function getAllowedOrigin(origin: string | null): string {
  if (!origin) return allowedProductionOrigins[0];
  
  // Allow any localhost port for development
  if (origin.startsWith('http://localhost:')) {
    return origin;
  }
  
  // Allow exact production domains
  if (allowedProductionOrigins.includes(origin)) {
    return origin;
  }
  
  // Fallback
  return allowedProductionOrigins[0];
}

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin');
  const allowOrigin = getAllowedOrigin(origin);

  const corsHeaders = {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const { registration_id } = await req.json();

    if (!registration_id) {
      return new Response(JSON.stringify({ error: "Missing registration_id" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('workshop_registrations')
      .select('registration_status, payment_status, razorpay_payment_id')
      .eq('registration_id', registration_id)
      .single();

    if (error || !data) {
      return new Response(JSON.stringify({ error: "Registration not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("Check Payment Status Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
