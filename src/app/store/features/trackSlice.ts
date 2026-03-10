import { TrackType } from '@/app/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  isShuffle: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  currentTrackIndex: number;
  favoriteTracks: TrackType[];
  allTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  playlist: [],
  shuffledPlaylist: [],
  currentTrackIndex: -1,
  favoriteTracks: [],
  allTracks: [],
  fetchError: null,
  fetchIsLoading: true,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
      const index = state.playlist.findIndex(
        (el) => el._id === action.payload._id,
      );
      state.currentTrackIndex = index;
    },
    setPlayList: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...action.payload].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;

      const currentIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );

      if (state.isShuffle) {
        const nextIndex =
          currentIndex === playlist.length - 1 ? 0 : currentIndex + 1;
        state.currentTrack = playlist[nextIndex];
        state.currentTrackIndex = nextIndex;
        state.isPlay = true;
      } else {
        const nextIndexTrack = currentIndex + 1;
        if (nextIndexTrack < playlist.length) {
          state.currentTrack = playlist[nextIndexTrack];
          state.currentTrackIndex = nextIndexTrack;
          state.isPlay = true;
        } else {
          state.currentTrack = null;
          state.currentTrackIndex = -1;
          state.isPlay = false;
        }
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;

      const currentIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );

      if (state.isShuffle) {
        const prevIndex =
          currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
        state.currentTrack = playlist[prevIndex];
        state.currentTrackIndex = prevIndex;
        state.isPlay = true;
      } else {
        const prevIndexTrack = currentIndex - 1;
        if (prevIndexTrack >= 0) {
          state.currentTrack = playlist[prevIndexTrack];
          state.currentTrackIndex = prevIndexTrack;
          state.isPlay = true;
        }
      }
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id,
      );
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setPlayList,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
