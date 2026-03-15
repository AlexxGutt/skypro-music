import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { getFavoriteTracks } from '@/app/services/tracks/tracksApi';
import { setFavoriteTracks } from '@/app/store/features/trackSlice';
import { withReauth } from '@/app/utils/withReAuth';

export const useFetchFavorites = () => {
  const dispatch = useAppDispatch();
  const { access, refresh } = useAppSelector((state) => state.auth);

  const fetchFavorites = useCallback(() => {
    if (!access) {
      dispatch(setFavoriteTracks([]));
      return Promise.resolve();
    }

    return withReauth(
      (newToken) => getFavoriteTracks(newToken || access),
      refresh,
      dispatch,
    )
      .then((favorites) => {
        dispatch(setFavoriteTracks(favorites));
      })
      .catch((error) => {
        throw error;
      });
  }, [access, refresh, dispatch]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    fetchFavorites,
  };
};
