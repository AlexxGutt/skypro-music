import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { getFavoriteTracks } from '@/app/services/tracks/tracksApi';
import { setFavoriteTracks } from '@/app/store/features/trackSlice';
import { withReauth } from '@/app/utils/withReAuth';

export const useFetchFavorites = () => {
  const dispatch = useAppDispatch();
  const { access, refresh } = useAppSelector((state) => state.auth);

  const fetchFavorites = useCallback(async () => {
    // Если нет доступа, просто ничего не делаем
    if (!access) {
      return;
    }

    try {
      const favorites = await withReauth(
        (newToken) => getFavoriteTracks(newToken || access),
        refresh,
        dispatch,
      );

      dispatch(setFavoriteTracks(favorites));
    } catch (error) {
      // Просто логируем ошибку, не обновляем стейт
      console.error('Error fetching favorites:', error);

      // Можно показать уведомление, если хочешь
      // Но не сохраняем ошибку в стейт
    }
  }, [access, refresh, dispatch]);

  // Загружаем избранное только если есть access токен
  useEffect(() => {
    if (access) {
      fetchFavorites();
    } else {
      // Если пользователь вышел, очищаем избранное
      dispatch(setFavoriteTracks([]));
    }
  }, [access, fetchFavorites, dispatch]);

  return {
    fetchFavorites,
  };
};
