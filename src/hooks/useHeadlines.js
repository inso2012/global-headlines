import { useState, useEffect, useRef } from 'react';

function buildParams(category, sourceId) {
  const params = new URLSearchParams({ pageSize: '40' });
  if (sourceId) {
    // Source mode: fetch by specific source
    params.set('sources', sourceId);
  } else {
    // Country + category mode (default: us + general)
    params.set('country', 'us');
    if (category && category !== 'general') {
      params.set('category', category);
    }
  }
  return params;
}

export function useHeadlines(category, sourceId) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    async function fetchData() {
      setLoading(true);
      setError(null);

      const params = buildParams(category, sourceId);

      try {
        const res = await fetch(`/api/headlines?${params}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || `Request failed (${res.status})`);
        }

        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, [category, sourceId]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    const params = buildParams(category, sourceId);

    fetch(`/api/headlines?${params}`)
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return { articles, loading, error, refetch };
}
