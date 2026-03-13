'use client';

import { TrackType } from '@/app/sharedTypes/sharedTypes';
import { getUniqueValues } from '@/app/utils/helper';
import { useState } from 'react';
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

export default function Filter({ tracks }: filterProp) {
  const [activeFilter, setActiveFilter] = useState<null | string>(null);
  const dispatch = useAppDispatch();

  const changeActiveFilter = (nameFilter: string) => {
    if (activeFilter === nameFilter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(nameFilter);
    }
  };

  const uniqAuthors = getUniqueValues(tracks, 'author');
  const uniqGenres = getUniqueValues(tracks, 'genre');
  const years = ['Сначала новые', 'Сначала старые', 'По умолчанию'];

  const onSelectedAuthor = (author: string) => {
    dispatch(setFilterAuthors(author));
  };

  const onSelectedGenres = (genres: string) => {
    dispatch(setFilterGenres(genres));
  };

  const onSelectedYears = (years: string) => {
    dispatch(setFilterYears(years));
  };

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
}
