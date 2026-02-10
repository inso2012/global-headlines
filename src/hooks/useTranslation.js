import { useState, useEffect, useRef } from 'react';

const cache = new Map();

function cacheKey(url, lang) {
  return `${url}:${lang}`;
}

export function useTranslation(articles, language) {
  const [translatedArticles, setTranslatedArticles] = useState(articles);
  const [translating, setTranslating] = useState(false);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!language || language === 'en' || articles.length === 0) {
      setTranslatedArticles(articles);
      setTranslating(false);
      return;
    }

    // Check if all articles are already cached
    const allCached = articles.every(
      (a) => cache.has(cacheKey(a.url, language)),
    );

    if (allCached) {
      setTranslatedArticles(
        articles.map((a) => ({
          ...a,
          ...cache.get(cacheKey(a.url, language)),
        })),
      );
      setTranslating(false);
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setTranslating(true);

    // Collect texts to translate: [title0, desc0, title1, desc1, ...]
    const texts = [];
    for (const article of articles) {
      texts.push(article.title || '');
      texts.push(article.description || '');
    }

    fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts, target: language, source: 'en' }),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.message);

        const result = articles.map((article, i) => {
          const translatedTitle = data.translations[i * 2] || article.title;
          const translatedDesc = data.translations[i * 2 + 1] || article.description;

          // Cache per article
          cache.set(cacheKey(article.url, language), {
            title: translatedTitle,
            description: translatedDesc,
          });

          return { ...article, title: translatedTitle, description: translatedDesc };
        });

        setTranslatedArticles(result);
        setTranslating(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('Translation failed:', err.message);
        setTranslatedArticles(articles);
        setTranslating(false);
      });

    return () => controller.abort();
  }, [articles, language]);

  return { translatedArticles, translating };
}
