'use client';

import styles from './search.module.css';
import { useAppDispatch } from '@/app/store/store';
import { setSearchQuery } from '@/app/store/features/trackSlice';

export default function Search() {
  const dispatch = useAppDispatch();

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        onChange={onSearchInput}
      />
    </div>
  );
}
