import { TrackType } from '@/app/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  playlist: TrackType[];
  currentTrackIndex: Number;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
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
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setNextTrack: (state) => {
      if (state.currentTrack) {
        const currentIndex = state.playlist.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        const nextIndexTrack = currentIndex + 1;
        if (nextIndexTrack < state.playlist.length) {
          state.currentTrack = state.playlist[nextIndexTrack];
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
      if (state.currentTrack) {
        const currentIndex = state.playlist.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        const prevIndexTrack = currentIndex - 1;
        state.currentTrack = state.playlist[prevIndexTrack];
      }
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setPlayList,
  setNextTrack,
  setPrevTrack,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
