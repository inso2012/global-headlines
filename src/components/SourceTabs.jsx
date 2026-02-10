import { GLOBAL_SOURCES } from '../utils/sources';
import styles from './SourceTabs.module.css';

export default function SourceTabs({ active, onChange }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scroll}>
        <button
          className={`${styles.tab} ${active === null ? styles.active : ''}`}
          onClick={() => onChange(null)}
        >
          All Sources
        </button>
        {GLOBAL_SOURCES.map(source => (
          <button
            key={source.id}
            className={`${styles.tab} ${active === source.id ? styles.active : ''}`}
            onClick={() => onChange(source.id)}
          >
            {source.name}
          </button>
        ))}
      </div>
    </div>
  );
}
