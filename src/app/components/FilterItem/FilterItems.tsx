import classNames from 'classnames';
import styles from './filterItems.module.css';
import { useAppSelector } from '@/app/store/store';

type filterItemProps = {
  activeFilter: null | string;
  changeActiveFilter: (n: string) => void;
  nameFilter: string;
  list: string[];
  titleFilter: string;
  onSelect: (value: string) => void;
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

  const { filters } = useAppSelector((state) => state.tracks);

  const isItemActive = (item: string) => {
    if (nameFilter === 'author') {
      return filters.authors.includes(item);
    } else if (nameFilter === 'genre') {
      return filters.genres.includes(item);
    } else if (nameFilter === 'year') {
      return filters.years === item;
    }
    return false;
  };

  return (
    <div className={styles.filter__wrapper}>
      <div
        className={classNames(styles.filter__button, {
          [styles.filter__button_active]: isOpen,
        })}
        onClick={() => changeActiveFilter(nameFilter)}
      >
        {titleFilter}
      </div>

      {isOpen && (
        <div className={styles.filter__dropdown}>
          {list.map((el, index) => {
            const isActive = isItemActive(el);

            return (
              <div
                key={index}
                onClick={() => onSelect(el)}
                className={classNames(styles.dropdown__item, {
                  [styles.dropdown__item_active]:
                    isActive && nameFilter !== 'year',
                  [styles.dropdown__item_radio_active]:
                    isActive && nameFilter === 'year',
                })}
              >
                {el}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
