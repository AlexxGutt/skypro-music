'use client';
import Link from 'next/link';
import styles from './bar.module.css';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from '@/app/store/features/trackSlice';
import { formatTime } from '@/app/utils/helper';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const playlist = useAppSelector((state) => state.tracks.playlist);

  const [isLoop, setIsLoop] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isChangingTrack, setIsChangingTrack] = useState(false);

  useEffect(() => {
    if (!audioRef.current || isChangingTrack) return;

    if (isPlay) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlay, isChangingTrack]);

  useEffect(() => {
    if (!currentTrack || !audioRef.current) return;

    setIsChangingTrack(true);
    setIsLoadedTrack(false);
    dispatch(setIsPlay(false));

    setTimeout(() => {
      audioRef.current!.src = currentTrack.track_file;
      setTimeout(() => {
        dispatch(setIsPlay(true));
        setIsChangingTrack(false);
      }, 300);
    }, 100);
  }, [currentTrack, dispatch]);

  const onToggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const togglePlayPause = () => {
    dispatch(setIsPlay(!isPlay));
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoadedTrack(true);
      audioRef.current.play();
      dispatch(setIsPlay(true));
    }
  };

  const onLoadStart = () => {
    setIsLoadedTrack(false);
  };

  const onCanPlay = () => {
    setIsLoadedTrack(true);
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eVolume = Number(e.target.value);
    setVolume(eVolume);
    if (audioRef.current) audioRef.current.volume = eVolume / 100;
  };

  const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);

      audioRef.current.currentTime = inputTime;
    }
  };

  const onEnded = () => {
    const currentIndex = playlist.findIndex(
      (track) => track._id === currentTrack?._id,
    );

    if (currentIndex === playlist.length - 1) {
      dispatch(setIsPlay(false));
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
      }
    } else {
      dispatch(setNextTrack());
    }
  };

  const onNextTrack = () => {
    const currentIndex = playlist.findIndex(
      (track) => track._id === currentTrack?._id,
    );

    if (currentIndex === playlist.length - 1) {
      dispatch(setIsPlay(false));
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
      }
    } else {
      dispatch(setNextTrack());
    }
  };

  const onPrevTrack = () => {
    if (!audioRef.current) return;

    const currentIndex = playlist.findIndex(
      (track) => track._id === currentTrack?._id,
    );

    if (currentIndex === 0) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      dispatch(setPrevTrack());
    }
  };

  const onShuffle = () => {
    dispatch(toggleShuffle());
    setIsShuffle(!isShuffle);
  };

  if (!currentTrack) return <></>;

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        loop={isLoop}
        controls
        style={{ display: 'none' }}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onLoadStart={onLoadStart}
        onCanPlay={onCanPlay}
        onEnded={onEnded}
      ></audio>
      <div className={styles.bar__content}>
        <ProgressBar
          max={audioRef.current?.duration || 0}
          step={0.1}
          readOnly={!isLoadedTrack}
          value={currentTime}
          onChange={onChangeProgress}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev}>
                <svg
                  onClick={onPrevTrack}
                  className={styles.player__btnPrevSvg}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.player__btnPlay, styles.btn)}
                onClick={togglePlayPause}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={
                      isPlay
                        ? '/img/icon/btn_pause.svg'
                        : '/img/icon/sprite.svg#icon-play'
                    }
                  ></use>
                </svg>
              </div>
              <div className={styles.player__btnNext}>
                <svg
                  onClick={onNextTrack}
                  className={styles.player__btnNextSvg}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={onToggleLoop}
                className={classnames(
                  styles.player__btnRepeat,
                  styles.btnIcon,
                  isLoop && styles.active,
                )}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref={'/img/icon/sprite.svg#icon-repeat'}></use>
                </svg>
              </div>
              <div
                onClick={onShuffle}
                className={classnames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                  isShuffle && styles.active,
                )}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classnames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classnames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.timeDisplay}>
              {isLoadedTrack ? (
                <>
                  <span className={styles.timeCurrent}>
                    {formatTime(currentTime)}
                  </span>
                  <span className={styles.timeSeparator}> / </span>
                  <span className={styles.timeDuration}>
                    {formatTime(duration)}
                  </span>
                </>
              ) : (
                <div className={styles.loader}>
                  Загрузка трека
                  <span className={styles.dot1}>.</span>
                  <span className={styles.dot2}>.</span>
                  <span className={styles.dot3}>.</span>
                </div>
              )}
            </div>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classnames(styles.volume__progress, styles.btn)}>
                <input
                  className={classnames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  onChange={changeVolume}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
