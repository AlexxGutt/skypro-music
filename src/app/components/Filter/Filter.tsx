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
import {
  SORT_OPTIONS,
  FILTER_NAMES,
  FILTER_TITLES,
  FilterName,
  SortOption,
} from '@/app/constants/constants';

type filterProp = {
  tracks: TrackType[];
};

const Filter = memo(({ tracks }: filterProp) => {
  const [activeFilter, setActiveFilter] = useState<FilterName | null>(null); // 👈 используем тип
  const dispatch = useAppDispatch();

  const changeActiveFilter = useCallback((nameFilter: FilterName) => {
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
      dispatch(setFilterYears(year as SortOption));
    },
    [dispatch],
  );

  const uniqAuthors = useMemo(
    () => getUniqueValues(tracks, 'author'),
    [tracks],
  );
  const uniqGenres = useMemo(() => getUniqueValues(tracks, 'genre'), [tracks]);
  const years = useMemo(() => Object.values(SORT_OPTIONS), []);

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <FilterItems
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={FILTER_NAMES.AUTHOR}
        list={uniqAuthors}
        titleFilter={FILTER_TITLES[FILTER_NAMES.AUTHOR]}
        onSelect={onSelectedAuthor}
      />
      <FilterItems
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={FILTER_NAMES.YEAR}
        list={years}
        titleFilter={FILTER_TITLES[FILTER_NAMES.YEAR]}
        onSelect={onSelectedYears}
      />
      <FilterItems
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={FILTER_NAMES.GENRE}
        list={uniqGenres}
        titleFilter={FILTER_TITLES[FILTER_NAMES.GENRE]}
        onSelect={onSelectedGenres}
      />
    </div>
  );
});

Filter.displayName = 'Filter';
export default Filter;
