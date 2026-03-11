// app/components/Centerblock/Centerblock.tsx
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Track from '../Track/Track';
import Filter from '../Filter/Filter';
import classnames from 'classnames';
import { TrackType } from '@/app/sharedTypes/sharedTypes';
import { ReactNode } from 'react';

interface CenterblockProps {
  tracks: TrackType[];
  isLoading: boolean;
  error: string | null;
  title?: string;
  children?: ReactNode;
}

export default function Centerblock({
  tracks,
  isLoading,
  error,
  title = 'Треки',
  children,
}: CenterblockProps) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={tracks} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classnames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.centerblock__status}>
            <div className={styles.loader}>
              <span>Загрузка подборки</span>
              <span className={styles.dot1}>.</span>
              <span className={styles.dot2}>.</span>
              <span className={styles.dot3}>.</span>
            </div>
          </div>
        ) : error ? (
          <div className={styles.centerblock__status}>
            <div className={styles.error}>
              <span className={styles.error__message}>{error}</span>
              <button
                className={styles.error__retry}
                onClick={() => window.location.reload()}
              >
                Попробовать снова
              </button>
            </div>
          </div>
        ) : tracks.length === 0 ? (
          <div className={styles.centerblock__status}>
            {children || (
              <div className={styles.empty}>
                В этой подборке пока нет треков
              </div>
            )}
          </div>
        ) : (
          <div className={styles.content__playlist}>
            {tracks.map((track) => (
              <Track key={track._id} track={track} tracks={tracks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
