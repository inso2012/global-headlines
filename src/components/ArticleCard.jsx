import { useState } from 'react';
import styles from './ArticleCard.module.css';

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ArticleCard({ article }) {
  const [imgError, setImgError] = useState(false);
  const { title, description, urlToImage, url, source, publishedAt } = article;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <div className={styles.imageWrapper}>
        {urlToImage && !imgError ? (
          <img
            src={urlToImage}
            alt=""
            className={styles.image}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.placeholder}>
            <span>{source?.name?.[0] || '?'}</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.source}>{source?.name}</span>
          {publishedAt && <span className={styles.time}>{timeAgo(publishedAt)}</span>}
        </div>
        <h3 className={styles.title}>{title}</h3>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
    </a>
  );
}
