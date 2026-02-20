// components/Track/Track.tsx
'use client';
import styles from './track.module.css';
import Link from 'next/link';
import { formatTime } from '@/app/utils/helper';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import {
  setCurrentTrack,
  setIsPlay,
  setPlayList,
} from '@/app/store/features/trackSlice';
import { TrackType } from '@/app/sharedTypes/sharedTypes';

interface TrackProps {
  tracks: TrackType[];
}

export default function Track({ tracks }: TrackProps) {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);

  const onClickTrack = (track: TrackType) => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
    dispatch(setPlayList(tracks)); // Используем актуальные треки из API
  };

  if (!tracks || tracks.length === 0) {
    return <div className={styles.content__playlist}>Нет доступных треков</div>;
  }

  return (
    <div className={styles.content__playlist}>
      <div className={styles.playlist__item}>
        {tracks.map((track) => {
          const isCurrentTrack = currentTrack?._id === track._id;

          return (
            <div
              key={track._id}
              className={styles.playlist__track}
              onClick={() => onClickTrack(track)}
            >
              <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                  {isCurrentTrack ? (
                    <div
                      className={`${styles.track__pulsingDot} ${isPlay ? '' : styles.static}`}
                    />
                  ) : (
                    <svg className={styles.track__titleSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                  )}
                </div>
                <div>
                  <Link className={styles.track__titleLink} href="">
                    {track.name}
                    <span className={styles.track__titleSpan}></span>
                  </Link>
                </div>
              </div>
              <div className={styles.track__author}>
                <Link className={styles.track__authorLink} href="">
                  {track.author}
                </Link>
              </div>
              <div className={styles.track__album}>
                <Link className={styles.track__albumLink} href="">
                  {track.album}
                </Link>
              </div>
              <div className="track__time">
                <svg className={styles.track__timeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>
                  {formatTime(track.duration_in_seconds)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
