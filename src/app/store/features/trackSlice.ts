import { TrackType } from '@/app/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  isShuffle: Boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  currentTrackIndex: Number;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  playlist: [],
  shuffledPlaylist: [],
  currentTrackIndex: -1,
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
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      const prevIndexTrack = currentIndex - 1;
      state.currentTrack = playlist[prevIndexTrack];
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
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
