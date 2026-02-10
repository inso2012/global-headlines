import { CATEGORIES } from '../utils/sources';
import styles from './CategoryFilter.module.css';

export default function CategoryFilter({ active, onChange, disabled }) {
  return (
    <div className={styles.wrapper}>
      {CATEGORIES.map(cat => (
        <button
          key={cat.id}
          className={`${styles.pill} ${active === cat.id ? styles.active : ''}`}
          onClick={() => onChange(cat.id)}
          disabled={disabled}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
