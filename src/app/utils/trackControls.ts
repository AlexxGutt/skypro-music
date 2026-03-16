import { TrackType } from '../sharedTypes/sharedTypes';

type Playlist = TrackType[];

interface TrackNavigationResult {
  nextTrack: TrackType | null;
  nextIndex: number;
  shouldPlay: boolean;
}

export const getNextTrack = (
  currentTrack: TrackType | null,
  playlist: Playlist,
  isShuffle: boolean,
  shuffledPlaylist: Playlist,
): TrackNavigationResult => {
  if (!currentTrack) {
    return { nextTrack: null, nextIndex: -1, shouldPlay: false };
  }

  const activePlaylist = isShuffle ? shuffledPlaylist : playlist;
  const currentIndex = activePlaylist.findIndex(
    (t) => t._id === currentTrack._id,
  );

  if (currentIndex === -1) {
    return { nextTrack: null, nextIndex: -1, shouldPlay: false };
  }

  if (isShuffle) {
    const nextIndex =
      currentIndex === activePlaylist.length - 1 ? 0 : currentIndex + 1;
    return {
      nextTrack: activePlaylist[nextIndex],
      nextIndex,
      shouldPlay: true,
    };
  } else {
    const nextIndex = currentIndex + 1;
    if (nextIndex < activePlaylist.length) {
      return {
        nextTrack: activePlaylist[nextIndex],
        nextIndex,
        shouldPlay: true,
      };
    } else {
      return {
        nextTrack: null,
        nextIndex: -1,
        shouldPlay: false,
      };
    }
  }
};

export const getPrevTrack = (
  currentTrack: TrackType | null,
  playlist: Playlist,
  isShuffle: boolean,
  shuffledPlaylist: Playlist,
): TrackNavigationResult => {
  if (!currentTrack) {
    return { nextTrack: null, nextIndex: -1, shouldPlay: false };
  }

  const activePlaylist = isShuffle ? shuffledPlaylist : playlist;
  const currentIndex = activePlaylist.findIndex(
    (t) => t._id === currentTrack._id,
  );

  if (currentIndex === -1) {
    return { nextTrack: null, nextIndex: -1, shouldPlay: false };
  }

  if (isShuffle) {
    const prevIndex =
      currentIndex === 0 ? activePlaylist.length - 1 : currentIndex - 1;
    return {
      nextTrack: activePlaylist[prevIndex],
      nextIndex: prevIndex,
      shouldPlay: true,
    };
  } else {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      return {
        nextTrack: activePlaylist[prevIndex],
        nextIndex: prevIndex,
        shouldPlay: true,
      };
    } else {
      return {
        nextTrack: currentTrack,
        nextIndex: currentIndex,
        shouldPlay: true,
      };
    }
  }
};

export const createTrackNavigationUpdater = (
  currentTrack: TrackType | null,
  playlist: Playlist,
  isShuffle: boolean,
  shuffledPlaylist: Playlist,
) => ({
  next: () => getNextTrack(currentTrack, playlist, isShuffle, shuffledPlaylist),
  prev: () => getPrevTrack(currentTrack, playlist, isShuffle, shuffledPlaylist),
});
