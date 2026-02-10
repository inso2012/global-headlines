import { useState } from 'react';
import { useHeadlines } from './hooks/useHeadlines';
import { useTranslation } from './hooks/useTranslation';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import SourceTabs from './components/SourceTabs';
import ArticleGrid from './components/ArticleGrid';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import TranslatingOverlay from './components/TranslatingOverlay';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [activeSource, setActiveSource] = useState(null);
  const [language, setLanguage] = useState('en');

  const { articles, loading, error, refetch } = useHeadlines(
    activeSource ? null : activeCategory,
    activeSource,
  );

  const { translatedArticles, translating } = useTranslation(articles, language);

  function handleCategoryChange(category) {
    setActiveSource(null);
    setActiveCategory(category);
  }

  function handleSourceChange(sourceId) {
    setActiveSource(sourceId);
    if (sourceId) {
      setActiveCategory('general');
    }
  }

  return (
    <div>
      <Header language={language} onLanguageChange={setLanguage} />
      <CategoryFilter
        active={activeCategory}
        onChange={handleCategoryChange}
        disabled={!!activeSource}
      />
      <SourceTabs
        active={activeSource}
        onChange={handleSourceChange}
      />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <>
          {translating && <TranslatingOverlay />}
          <ArticleGrid articles={translatedArticles} />
        </>
      )}
    </div>
  );
}
