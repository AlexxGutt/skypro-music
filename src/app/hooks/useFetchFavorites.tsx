import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { getFavoriteTracks } from '@/app/services/tracks/tracksApi';
import {
  setFavoriteTracks,
  syncFavoritePage,
} from '@/app/store/features/trackSlice';
import { withReauth } from '@/app/utils/withReAuth';
import { usePathname } from 'next/navigation';

export const useFetchFavorites = () => {
  const dispatch = useAppDispatch();
  const { access, refresh } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const isFavoritePage = pathname?.includes('/music/favorite');

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
        if (isFavoritePage) {
          dispatch(syncFavoritePage());
        }
      })
      .catch((error) => {
        throw error;
      });
  }, [access, refresh, dispatch, isFavoritePage]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    fetchFavorites,
  };
};
