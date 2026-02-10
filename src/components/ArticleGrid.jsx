import ArticleCard from './ArticleCard';
import styles from './ArticleGrid.module.css';

export default function ArticleGrid({ articles }) {
  if (articles.length === 0) {
    return (
      <div className={styles.empty}>
        No headlines found for this filter. Try a different category or source.
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {articles.map((article, i) => (
        <ArticleCard key={article.url || i} article={article} />
      ))}
    </div>
  );
}
