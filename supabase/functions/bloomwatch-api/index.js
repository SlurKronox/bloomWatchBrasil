import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
        throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set.');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const path = url.pathname.replace('/bloomwatch-api', '');

    if (path === '/plants' || path === '/plants/') {
      const { data, error } = await supabase
        .from('plantas')
        .select('*')
        .order('nome');

      if (error) throw error;

      return new Response(
        JSON.stringify({
          success: true,
          count: data.length,
          data: data,
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (path === '/regions' || path === '/regions/') {
      const { data, error } = await supabase
        .from('regioes')
        .select('*')
        .order('nome');

      if (error) throw error;

      return new Response(
        JSON.stringify({
          success: true,
          count: data.length,
          data: data,
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (path.startsWith('/plants/')) {
      const plantId = path.replace('/plants/', '');
      const { data, error } = await supabase
        .from('plantas')
        .select('*')
        .eq('id', plantId)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Plant not found',
          }),
          {
            status: 404,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          data: data,
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (path.startsWith('/regions/')) {
      const regionId = path.replace('/regions/', '');
      const { data, error } = await supabase
        .from('regioes')
        .select('*')
        .eq('id', regionId)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Region not found',
          }),
          {
            status: 404,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          data: data,
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (path === '/predictions' || path === '/predictions/') {
      const { data, error } = await supabase
        .from('predictions')
        .select('*, plantas(*), regioes(*)')
        .order('predicted_bloom_date');

      if (error) throw error;

      return new Response(
        JSON.stringify({
          success: true,
          count: data.length,
          data: data,
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (path === '/bloom-history' || path === '/bloom-history/') {
      const { data, error } = await supabase
        .from('bloom_history')
        .select('*, plantas(*), regioes(*)')
        .order('bloom_start_date', { ascending: false });

      if (error) throw error;

      return new Response(
        JSON.stringify({
          success: true,
          count: data.length,
          data: data,
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (path === '/stats' || path === '/stats/') {
      const [plantsResult, regionsResult] = await Promise.all([
        supabase.from('plantas').select('*', { count: 'exact', head: true }),
        supabase.from('regioes').select('*', { count: 'exact', head: true }),
      ]);

      return new Response(
        JSON.stringify({
          success: true,
          data: {
            totalPlants: plantsResult.count || 0,
            totalRegions: regionsResult.count || 0,
            version: '2.0.0',
            lastUpdated: new Date().toISOString(),
          },
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (path === '/' || path === '') {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'BloomWatch Public API v2.0',
          documentation: {
            endpoints: [
              'GET /plants - List all plants',
              'GET /plants/:id - Get specific plant',
              'GET /regions - List all regions',
              'GET /regions/:id - Get specific region',
              'GET /predictions - List all predictions',
              'GET /bloom-history - List bloom history',
              'GET /stats - Get API statistics',
            ],
          },
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Endpoint not found',
      }),
      {
        status: 404,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Internal server error',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});