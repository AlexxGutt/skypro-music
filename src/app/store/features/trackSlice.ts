import { TrackType } from '@/app/sharedTypes/sharedTypes';
import { applyFilters } from '@/app/utils/applyFilters';
import { toggleFilterInArray } from '@/app/utils/toggleFilter';
import { getNextTrack, getPrevTrack } from '@/app/utils/trackControls';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type initialStateType = {
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
  filteredTracks: TrackType[];
  pagePlaylist: TrackType[];
  searchQuery: string;
  filters: {
    authors: string[];
    genres: string[];
    years: string;
  };
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
  filteredTracks: [],
  pagePlaylist: [],
  searchQuery: '',
  filters: {
    authors: [],
    genres: [],
    years: 'По умолчанию',
  },
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
      const result = getNextTrack(
        state.currentTrack,
        state.playlist,
        state.isShuffle,
        state.shuffledPlaylist,
      );

      state.currentTrack = result.nextTrack;
      state.currentTrackIndex = result.nextIndex;
      state.isPlay = result.shouldPlay;
    },
    setPrevTrack: (state) => {
      const result = getPrevTrack(
        state.currentTrack,
        state.playlist,
        state.isShuffle,
        state.shuffledPlaylist,
      );

      state.currentTrack = result.nextTrack;
      state.currentTrackIndex = result.nextIndex;
      state.isPlay = result.shouldPlay;
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
    syncFavoritePage: (state) => {
      state.pagePlaylist = state.favoriteTracks;
      state.filteredTracks = applyFilters(state);
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    setPagePlaylist: (state, action) => {
      state.pagePlaylist = action.payload;
      state.filteredTracks = applyFilters(state);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredTracks = applyFilters(state);
    },
    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      state.filters.authors = toggleFilterInArray(
        state.filters.authors,
        author,
      );
      state.filteredTracks = applyFilters(state);
    },
    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genre = action.payload;
      state.filters.genres = toggleFilterInArray(state.filters.genres, genre);
      state.filteredTracks = applyFilters(state);
    },
    setFilterYears: (state, action: PayloadAction<string>) => {
      state.filters.years = action.payload;
      state.filteredTracks = applyFilters(state);
    },
    setResetFilters: (state) => {
      state.filters = {
        authors: [],
        genres: [],
        years: 'По умолчанию',
      };
      state.searchQuery = '';
      state.filteredTracks = applyFilters(state);
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
  setFilterAuthors,
  setPagePlaylist,
  setFilterGenres,
  setFilterYears,
  setSearchQuery,
  setResetFilters,
  syncFavoritePage,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
