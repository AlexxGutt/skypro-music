'use client';

import { useAppSelector } from '@/app/store/store';
import styles from './page.module.css';
import Centerblock from '@/app/components/Centerblock/Centerblock';
import { useFetchFavorites } from '@/app/hooks/useFetchFavorites';

export default function FavoritesPage() {
  const { favoriteTracks, filteredTracks, fetchIsLoading, fetchError } =
    useAppSelector((state) => state.tracks);
  const { access } = useAppSelector((state) => state.auth);

  useFetchFavorites();

  if (!access) {
    return (
      <Centerblock
        tracks={[]}
        pagePlaylist={[]}
        isLoading={false}
        error={null}
        title="Избранные треки"
      >
        <div className={styles.messageContainer}>
          <div className={styles.emptyMessage}>
            <p>Войдите в аккаунт, чтобы увидеть избранные треки</p>
            <a href="/signin" className={styles.emptyLink}>
              Перейти к авторизации
            </a>
          </div>
        </div>
      </Centerblock>
    );
  }

  if (!fetchIsLoading && favoriteTracks.length === 0) {
    return (
      <Centerblock
        tracks={[]}
        pagePlaylist={[]}
        isLoading={false}
        error={null}
        title="Избранные треки"
      >
        <div className={styles.messageContainer}>
          <div className={styles.emptyMessage}>
            <p>У вас пока нет избранных треков</p>
            <p className={styles.emptyHint}>
              Нажмите на сердечко рядом с треком, чтобы добавить его в избранное
            </p>
            <a href="/" className={styles.emptyLink}>
              Перейти к трекам
            </a>
          </div>
        </div>
      </Centerblock>
    );
  }

  return (
    <Centerblock
      tracks={filteredTracks}
      pagePlaylist={favoriteTracks}
      isLoading={fetchIsLoading}
      error={fetchError}
      title="Избранные треки"
    />
  );
}
