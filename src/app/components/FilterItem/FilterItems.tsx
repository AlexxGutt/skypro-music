'use client';

import styles from './filterItems.module.css';

interface FilterItemProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  items?: string[];
  onItemClick?: (item: string) => void;
}

export default function FilterItem({
  label,
  isOpen,
  onToggle,
  items,
  onItemClick,
}: FilterItemProps) {
  return (
    <div className={styles.filter__wrapper}>
      <div
        className={`${styles.filter__button} ${
          isOpen ? styles.filter__button_active : ''
        }`}
        onClick={onToggle}
      >
        {label}
      </div>
      {isOpen && items && items.length > 0 && (
        <div className={styles.filter__dropdown}>
          {items.map((item) => (
            <div
              key={item}
              className={styles.dropdown__item}
              onClick={() => onItemClick?.(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
