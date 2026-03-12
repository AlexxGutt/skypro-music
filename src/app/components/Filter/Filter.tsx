'use client';

import { TrackType } from '@/app/sharedTypes/sharedTypes';
import { getUniqueValues } from '@/app/utils/helper';
import { useState } from 'react';
import styles from './filter.module.css';
import FilterItems from '../FilterItem/FilterItems';

type filterProp = {
  tracks: TrackType[];
};

export default function Filter({ tracks }: filterProp) {
  const [activeFilter, setActiveFilter] = useState<null | string>(null);

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

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <FilterItems
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'author'}
        list={uniqAuthors}
        titleFilter={'исполнителю'}
      />
      <FilterItems
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'year'}
        list={years}
        titleFilter={'году выпуска'}
      />
      <FilterItems
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'genre'}
        list={uniqGenres}
        titleFilter={'жанру'}
      />
    </div>
  );
}
