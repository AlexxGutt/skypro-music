'use client';
import Centerblock from '@/app/components/Centerblock/Centerblock';
import styles from './page.module.css';
import { useAppSelector } from '@/app/store/store';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <div className={styles.main}>
      <Centerblock
        tracks={allTracks}
        isLoading={fetchIsLoading}
        error={fetchError}
      />
    </div>
  );
}
