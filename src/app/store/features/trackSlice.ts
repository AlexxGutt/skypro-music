import { Track } from '@/app/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: Track | null;
};

const initialState: initialStateType = {
  currentTrack: null,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
  },
});

export const { setCurrentTrack } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
