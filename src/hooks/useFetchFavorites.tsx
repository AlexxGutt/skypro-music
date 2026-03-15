import { useEffect, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { getFavoriteTracks } from '@/app/services/tracks/tracksApi';
import { setFavoriteTracks } from '@/app/store/features/trackSlice';
import { withReauth } from '@/app/utils/withReAuth';
import { AxiosError } from 'axios';

export const useFetchFavorites = () => {
  const dispatch = useAppDispatch();
  const { access, refresh } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchFavorites = useCallback(() => {
    if (!access) {
      dispatch(setFavoriteTracks([]));
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    withReauth(
      (newToken) => getFavoriteTracks(newToken || access),
      refresh,
      dispatch,
    )
      .then((favorites) => {
        dispatch(setFavoriteTracks(favorites));
      })
      .catch((error) => {
        console.error('Error fetching favorites:', error);

        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMsg(
              error.response.data.message || 'Ошибка загрузки избранного',
            );
          } else if (error.request) {
            setErrorMsg('Сервер не отвечает. Попробуйте позже');
          } else {
            setErrorMsg('Неизвестная ошибка');
          }
        } else {
          setErrorMsg('Неизвестная ошибка');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [access, refresh, dispatch]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    fetchFavorites,
    isLoading,
    errorMsg,
  };
};
