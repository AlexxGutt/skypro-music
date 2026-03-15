import classNames from 'classnames';
import styles from './filterItems.module.css';
import { useAppSelector } from '@/app/store/store';
import { FilterName } from '@/app/constants/constants';

type filterItemProps = {
  activeFilter: null | string;
  changeActiveFilter: (nameFilter: FilterName) => void;
  nameFilter: FilterName;
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

  const getSelectedCount = () => {
    if (nameFilter === 'author') {
      return filters.authors.length;
    } else if (nameFilter === 'genre') {
      return filters.genres.length;
    } else if (nameFilter === 'year') {
      return filters.years !== 'По умолчанию' ? 1 : 0;
    }
    return 0;
  };

  const selectedCount = getSelectedCount();

  return (
    <div className={styles.filter__wrapper}>
      <div
        className={classNames(styles.filter__button, {
          [styles.filter__button_active]: isOpen,
          [styles.filter__button_withBadge]: selectedCount > 0,
        })}
        onClick={() => changeActiveFilter(nameFilter)}
      >
        {titleFilter}
        {selectedCount > 0 && (
          <span className={styles.filter__badge}>{selectedCount}</span>
        )}
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
