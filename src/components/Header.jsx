import LanguageSelector from './LanguageSelector';
import styles from './Header.module.css';

export default function Header({ language, onLanguageChange }) {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <h1 className={styles.title}>Global Headlines</h1>
        <LanguageSelector active={language} onChange={onLanguageChange} />
      </div>
      <p className={styles.subtitle}>Top stories from the world's leading news sources</p>
    </header>
  );
}
