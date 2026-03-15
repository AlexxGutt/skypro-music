import { SORT_OPTIONS } from '../constants/constants';
import { TrackType } from '../sharedTypes/sharedTypes';
import { initialStateType } from '../store/features/trackSlice';

export const applyFilters = (state: initialStateType): TrackType[] => {
  if (!state.pagePlaylist || state.pagePlaylist.length === 0) {
    return [];
  }

  let filteredPlaylist = [...state.pagePlaylist];

  if (state.searchQuery?.trim()) {
    const query = state.searchQuery.toLowerCase().trim();
    filteredPlaylist = filteredPlaylist.filter(
      (track) =>
        track.name.toLowerCase().includes(query) ||
        track.author.toLowerCase().includes(query),
    );
  }

  if (state.filters.authors.length > 0) {
    filteredPlaylist = filteredPlaylist.filter((track) =>
      state.filters.authors.includes(track.author),
    );
  }

  if (state.filters.genres.length > 0) {
    filteredPlaylist = filteredPlaylist.filter((track) =>
      state.filters.genres.some((genre) => track.genre.includes(genre)),
    );
  }

  if (state.filters.years === SORT_OPTIONS.NEW) {
    filteredPlaylist = [...filteredPlaylist].sort(
      (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
    );
  } else if (state.filters.years === SORT_OPTIONS.OLD) {
    filteredPlaylist = [...filteredPlaylist].sort(
      (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime(),
    );
  }

  return filteredPlaylist;
};
