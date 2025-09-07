'use client';

import { getUniqueValues } from '@/app/utils/helper';
import styles from './filter.module.css';
import { data } from '@/app/data';
import { useState } from 'react';

export default function Filter() {
  const [isArtistFilterOpen, setIsArtistFilterOpen] = useState(false);
  const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
  const [isGenreFilterOpen, setIsGenreFilterOpen] = useState(false);

  const uniqueAuthors = getUniqueValues(data, 'author');
  const uniqueGenre = getUniqueValues(data, 'genre');

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
      <div className={styles.filter__wrapper}>
        <div
          className={`${styles.filter__button} ${
            isArtistFilterOpen ? styles.filter__button_active : ''
          }`}
          onClick={toggleArtistFilter}
        >
          исполнителю
        </div>
        {isArtistFilterOpen && (
          <div className={styles.filter__dropdown}>
            {uniqueAuthors.map((author) => (
              <div
                key={author}
                className={styles.dropdown__item}
                onClick={() => {
                  setIsArtistFilterOpen(false);
                }}
              >
                {author}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.filter__wrapper}>
        <div
          className={`${styles.filter__button} ${
            isYearFilterOpen ? styles.filter__button_active : ''
          }`}
          onClick={toggleYearFilter}
        >
          году выпуска
        </div>
        {isYearFilterOpen && (
          <div className={styles.filter__dropdown}>
            <div
              className={styles.dropdown__item}
              onClick={() => setIsYearFilterOpen(false)}
            >
              Сначала новые
            </div>
            <div
              className={styles.dropdown__item}
              onClick={() => setIsYearFilterOpen(false)}
            >
              Сначала старые
            </div>
            <div
              className={styles.dropdown__item}
              onClick={() => setIsYearFilterOpen(false)}
            >
              По умолчанию
            </div>
          </div>
        )}
      </div>
      <div className={styles.filter__wrapper}>
        <div
          className={`${styles.filter__button} ${
            isGenreFilterOpen ? styles.filter__button_active : ''
          }`}
          onClick={toggleGenreFilter}
        >
          жанру
        </div>
        {isGenreFilterOpen && (
          <div className={styles.filter__dropdown}>
            {uniqueGenre.map((genre) => (
              <div
                key={genre}
                className={styles.dropdown__item}
                onClick={() => {
                  setIsGenreFilterOpen(false);
                }}
              >
                {genre}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
