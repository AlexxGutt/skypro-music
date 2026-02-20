'use client';
import { useEffect, useState } from 'react';
import Centerblock from '../../components/Centerblock/Centerblock';
import { getTracks } from '@/app/services/tracks/tracksApi';
import { TrackType } from '@/app/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTracks()
      .then((res) => {
        setTracks(res);
        setError(null);
      })
      .catch((error) => {
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Centerblock tracks={tracks} isLoading={isLoading} error={error} />
    </>
  );
}
