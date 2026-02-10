const NEWSAPI_BASE = 'https://newsapi.org/v2/top-headlines';
const CACHE_TTL = 900; // 15 minutes in seconds

export async function onRequestGet(context) {
  const { request, env } = context;
  const apiKey = env.NEWSAPI_KEY;

  if (!apiKey) {
    return Response.json(
      { error: true, message: 'NEWSAPI_KEY is not configured', code: 'CONFIG_ERROR' },
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const sources = url.searchParams.get('sources');
  const country = url.searchParams.get('country');
  const category = url.searchParams.get('category');
  const pageSize = url.searchParams.get('pageSize') || '20';

  // Build NewsAPI query params
  const params = new URLSearchParams({ pageSize });
  if (sources) {
    params.set('sources', sources);
  } else {
    if (country) params.set('country', country);
    if (category) params.set('category', category);
  }

  const newsApiUrl = `${NEWSAPI_BASE}?${params}`;

  // Check Cloudflare Cache
  const cache = caches.default;
  const cacheKey = new Request(newsApiUrl, { method: 'GET' });
  const cached = await cache.match(cacheKey);

  if (cached) {
    const response = new Response(cached.body, cached);
    response.headers.set('X-From-Cache', 'true');
    return response;
  }

  // Fetch from NewsAPI
  try {
    const res = await fetch(newsApiUrl, {
      headers: {
        'X-Api-Key': apiKey,
        'User-Agent': 'GlobalHeadlines/1.0',
      },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const message = body.message || `NewsAPI responded with ${res.status}`;
      return Response.json(
        { error: true, message, code: res.status === 429 ? 'RATE_LIMITED' : 'API_ERROR' },
        { status: res.status },
      );
    }

    const data = await res.json();

    // Build cacheable response
    const response = Response.json(data, {
      headers: {
        'Cache-Control': `public, max-age=${CACHE_TTL}`,
      },
    });

    // Store in Cloudflare cache (non-blocking)
    context.waitUntil(cache.put(cacheKey, response.clone()));

    return response;
  } catch (err) {
    return Response.json(
      { error: true, message: err.message, code: 'NETWORK_ERROR' },
      { status: 502 },
    );
  }
}
