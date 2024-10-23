const server = Bun.serve({
  port: 4000,
  async fetch(req) {
    const url = new URL(req.url)
    const method = req.method

    // Set CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    // Handle CORS preflight request
    if (method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      })
    }

    if (url.pathname === '/') {
      return new Response('Welcome to the movie database', {
        headers: corsHeaders,
      })
    }

    if (url.pathname === '/api/hello') {
      return new Response(
        JSON.stringify({ message: 'Hello from the backend!' }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        },
      )
    }

    return new Response('404!', {
      headers: corsHeaders,
    })
  },
})
