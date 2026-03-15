'use client';

import { TrackType } from '@/app/sharedTypes/sharedTypes';
import { getUniqueValues } from '@/app/utils/helper';
import { useState, useCallback, memo, useMemo } from 'react';
import styles from './filter.module.css';
import FilterItems from '../FilterItem/FilterItems';
import { useAppDispatch } from '@/app/store/store';
import {
  setFilterAuthors,
  setFilterGenres,
  setFilterYears,
} from '@/app/store/features/trackSlice';

type filterProp = {
  tracks: TrackType[];
};

const Filter = memo(({ tracks }: filterProp) => {
  const [activeFilter, setActiveFilter] = useState<null | string>(null);
  const dispatch = useAppDispatch();

  const changeActiveFilter = useCallback((nameFilter: string) => {
    setActiveFilter((prev) => (prev === nameFilter ? null : nameFilter));
  }, []);

  const onSelectedAuthor = useCallback(
    (author: string) => {
      dispatch(setFilterAuthors(author));
    },
    [dispatch],
  );

  const onSelectedGenres = useCallback(
    (genre: string) => {
      dispatch(setFilterGenres(genre));
    },
    [dispatch],
  );

  const onSelectedYears = useCallback(
    (year: string) => {
      dispatch(setFilterYears(year));
    },
    [dispatch],
  );

  const uniqAuthors = useMemo(
    () => getUniqueValues(tracks, 'author'),
    [tracks],
  );
  const uniqGenres = useMemo(() => getUniqueValues(tracks, 'genre'), [tracks]);
  const years = useMemo(
    () => ['Сначала новые', 'Сначала старые', 'По умолчанию'],
    [],
  );

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <FilterItems
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'author'}
        list={uniqAuthors}
        titleFilter={'исполнителю'}
        onSelect={onSelectedAuthor}
      />
      <FilterItems
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'year'}
        list={years}
        titleFilter={'году выпуска'}
        onSelect={onSelectedYears}
      />
      <FilterItems
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'genre'}
        list={uniqGenres}
        titleFilter={'жанру'}
        onSelect={onSelectedGenres}
      />
    </div>
  );
});

Filter.displayName = 'Filter';
export default Filter;
