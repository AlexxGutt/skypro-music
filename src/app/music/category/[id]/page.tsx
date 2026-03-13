'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Centerblock from '@/app/components/Centerblock/Centerblock';
import { getCategoryTracks } from '@/app/services/tracks/tracksApi';
import { TrackType } from '@/app/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { useAppSelector, useAppDispatch } from '@/app/store/store';
import { setPagePlaylist } from '@/app/store/features/trackSlice';

const categoryTitles: Record<string, string> = {
  '2': 'Плейлист дня',
  '3': '100 танцевальных хитов',
  '4': 'Инди-заряд',
};

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const dispatch = useAppDispatch();

  const { allTracks, filteredTracks, fetchIsLoading } = useAppSelector(
    (state) => state.tracks,
  );

  const [categoryTracks, setCategoryTracks] = useState<TrackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    if (!fetchIsLoading) {
      getCategoryTracks(id)
        .then((categoryTrackIds) => {
          const filtered = allTracks.filter((track) =>
            categoryTrackIds.includes(track._id),
          );
          setCategoryTracks(filtered);

          // Устанавливаем pagePlaylist для фильтров
          dispatch(setPagePlaylist(filtered));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setError(
                error.response.data?.message || 'Ошибка при загрузке подборки',
              );
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
    }
  }, [fetchIsLoading, id, allTracks, dispatch]);

  return (
    <Centerblock
      tracks={filteredTracks} // Используем отфильтрованные треки из Redux
      pagePlaylist={categoryTracks} // Передаем треки категории для фильтров
      isLoading={isLoading}
      error={error}
      title={categoryTitles[id] || 'Подборка'}
    />
  );
}
