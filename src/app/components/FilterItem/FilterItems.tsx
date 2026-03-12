import classNames from 'classnames';
import styles from './filterItems.module.css';

type filterItemProps = {
  activeFilter: null | string;
  changeActiveFilter: (n: string) => void;
  nameFilter: string;
  list: string[];
  titleFilter: string;
  onSelect: (valur: string) => void;
};

export default function FilterItems({
  activeFilter,
  changeActiveFilter,
  nameFilter,
  list,
  titleFilter,
  onSelect,
}: filterItemProps) {
  const isOpen = activeFilter === nameFilter;
  return (
    <div className={styles.filter__wrapper}>
      <div
        className={classNames(styles.filter__button, {
          [styles.filter__button_active]: activeFilter === nameFilter,
        })}
        onClick={() => changeActiveFilter(nameFilter)}
      >
        {titleFilter}
      </div>
      {isOpen && (
        <div className={styles.filter__dropdown}>
          {list.map((el, index) => (
            <div
              key={index}
              onClick={() => onSelect(el)}
              className={styles.dropdown__item}
            >
              {el}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
