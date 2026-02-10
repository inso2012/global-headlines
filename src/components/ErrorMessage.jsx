import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>!</div>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retry} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
