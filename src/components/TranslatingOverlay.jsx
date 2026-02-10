import styles from './TranslatingOverlay.module.css';

export default function TranslatingOverlay() {
  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <p className={styles.text}>Translating articles...</p>
      </div>
    </div>
  );
}
