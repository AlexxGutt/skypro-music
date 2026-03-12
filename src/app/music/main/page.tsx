'use client';
import Centerblock from '@/app/components/Centerblock/Centerblock';
import styles from './page.module.css';
import { useAppSelector } from '@/app/store/store';
import { useEffect, useState } from 'react';
import { TrackType } from '@/app/sharedTypes/sharedTypes';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks, filteredTracks, filters } =
    useAppSelector((state) => state.tracks);

  const [playlist, setPlaylist] = useState<TrackType[]>([]);

  useEffect(() => {
    const currentPlaylist = filters.authors.length ? filteredTracks : allTracks;
    setPlaylist(currentPlaylist);
  }, [filteredTracks, allTracks]);

  return (
    <div className={styles.main}>
      <Centerblock
        pagePlaylist={allTracks}
        tracks={playlist}
        isLoading={fetchIsLoading}
        error={fetchError}
      />
    </div>
  );
}
