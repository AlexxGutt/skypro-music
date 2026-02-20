'use client';
import { useEffect, useState } from 'react';
import Centerblock from '@/app/components/Centerblock/Centerblock';
import { getTracks } from '@/app/services/tracks/tracksApi';
import { TrackType } from '@/app/sharedTypes/sharedTypes';
import styles from './page.module.css';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);

      try {
        const data = await getTracks();
        setTracks(data);
        setError(null);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
          } else if (error.request) {
            setError('Что-то с интернетом');
          } else {
            setError('Неизвестная ошибка');
          }
        } else {
          setError('Произошла ошибка при загрузке');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className={styles.main}>
      <Centerblock tracks={tracks} isLoading={isLoading} error={error} />
    </div>
  );
}
