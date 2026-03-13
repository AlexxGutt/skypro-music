'use client';
import Centerblock from '@/app/components/Centerblock/Centerblock';
import styles from './page.module.css';
import { useAppSelector } from '@/app/store/store';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks, filteredTracks } =
    useAppSelector((state) => state.tracks);

  return (
    <div className={styles.main}>
      <Centerblock
        pagePlaylist={allTracks}
        tracks={filteredTracks}
        isLoading={fetchIsLoading}
        error={fetchError}
      />
    </div>
  );
}
