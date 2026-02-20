import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Track from '../Track/Track';
import Filter from '../Filter/Filter';
import classnames from 'classnames';
import { TrackType } from '@/app/sharedTypes/sharedTypes';

interface CenterblockProps {
  tracks: TrackType[];
  isLoading: boolean;
  error: string | null;
}

export default function Centerblock({
  tracks,
  isLoading,
  error,
}: CenterblockProps) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
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
              <span>Загрузка треков</span>
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
        ) : (
          <Track tracks={tracks} />
        )}
      </div>
    </div>
  );
}
