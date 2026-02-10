import { LANGUAGES } from '../utils/languages';
import styles from './LanguageSelector.module.css';

export default function LanguageSelector({ active, onChange }) {
  return (
    <select
      className={styles.select}
      value={active}
      onChange={(e) => onChange(e.target.value)}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
