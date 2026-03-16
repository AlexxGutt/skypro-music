'use client';

import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Track from '../Track/Track';
import Filter from '../Filter/Filter';
import classnames from 'classnames';
import { TrackType } from '@/app/sharedTypes/sharedTypes';
import { ReactNode, useEffect, useRef, memo, useMemo } from 'react';
import { useAppDispatch } from '@/app/store/store';
import { setPagePlaylist } from '@/app/store/features/trackSlice';

const TrackList = memo(({ tracks }: { tracks: TrackType[] }) => (
  <div className={styles.content__playlist}>
    {tracks.map((track) => (
      <Track key={track._id} track={track} tracks={tracks} />
    ))}
  </div>
));

TrackList.displayName = 'TrackList';

interface CenterblockProps {
  tracks: TrackType[];
  isLoading: boolean;
  error: string | null;
  title?: string;
  children?: ReactNode;
  pagePlaylist?: TrackType[];
}

const Centerblock = memo(
  ({
    tracks,
    isLoading,
    error,
    title = 'Треки',
    children,
    pagePlaylist = [],
  }: CenterblockProps) => {
    const dispatch = useAppDispatch();
    const initialized = useRef(false);

    useEffect(() => {
      if (
        !isLoading &&
        !error &&
        pagePlaylist.length > 0 &&
        !initialized.current
      ) {
        initialized.current = true;
        dispatch(setPagePlaylist(pagePlaylist));
      }
    }, [isLoading, error, pagePlaylist, dispatch]);

    const titleContent = useMemo(
      () => <h2 className={styles.centerblock__h2}>{title}</h2>,
      [title],
    );

    return (
      <div className={styles.centerblock}>
        <Search />
        {titleContent}
        <Filter tracks={pagePlaylist} />
        <div className={styles.centerblock__content}>
          <div className={styles.content__title}>
            <div
              className={classnames(styles.playlistTitle__col, styles.col01)}
            >
              Трек
            </div>
            <div
              className={classnames(styles.playlistTitle__col, styles.col02)}
            >
              Исполнитель
            </div>
            <div
              className={classnames(styles.playlistTitle__col, styles.col03)}
            >
              Альбом
            </div>
            <div
              className={classnames(styles.playlistTitle__col, styles.col04)}
            >
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
            <TrackList tracks={tracks} />
          )}
        </div>
      </div>
    );
  },
);

Centerblock.displayName = 'Centerblock';
export default Centerblock;
