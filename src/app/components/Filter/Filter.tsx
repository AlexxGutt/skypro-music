// components/Filter/Filter.tsx
'use client';

import { getUniqueValues } from '@/app/utils/helper';
import styles from './filter.module.css';
import { data } from '@/app/data';
import { useState } from 'react';
import FilterItems from '../FilterItem/FilterItems';

export default function Filter() {
  const [isArtistFilterOpen, setIsArtistFilterOpen] = useState(false);
  const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
  const [isGenreFilterOpen, setIsGenreFilterOpen] = useState(false);

  const uniqueAuthors = getUniqueValues(data, 'author');
  const uniqueGenre = getUniqueValues(data, 'genre');

  const yearOptions = ['Сначала новые', 'Сначала старые', 'По умолчанию'];

  const toggleArtistFilter = () => {
    setIsArtistFilterOpen(!isArtistFilterOpen);
    setIsYearFilterOpen(false);
    setIsGenreFilterOpen(false);
  };

  const toggleYearFilter = () => {
    setIsYearFilterOpen(!isYearFilterOpen);
    setIsArtistFilterOpen(false);
    setIsGenreFilterOpen(false);
  };

  const toggleGenreFilter = () => {
    setIsGenreFilterOpen(!isGenreFilterOpen);
    setIsArtistFilterOpen(false);
    setIsYearFilterOpen(false);
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <FilterItems
        label="исполнителю"
        isOpen={isArtistFilterOpen}
        onToggle={toggleArtistFilter}
        items={uniqueAuthors}
      />
      <FilterItems
        label="году выпуска"
        isOpen={isYearFilterOpen}
        onToggle={toggleYearFilter}
        items={yearOptions}
      />
      <FilterItems
        label="жанру"
        isOpen={isGenreFilterOpen}
        onToggle={toggleGenreFilter}
        items={uniqueGenre}
      />
    </div>
  );
}
