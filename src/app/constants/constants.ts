export const SORT_OPTIONS = {
  NEW: 'Сначала новые',
  OLD: 'Сначала старые',
  DEFAULT: 'По умолчанию',
} as const;

export const FILTER_NAMES = {
  AUTHOR: 'author',
  GENRE: 'genre',
  YEAR: 'year',
} as const;

export const FILTER_TITLES = {
  [FILTER_NAMES.AUTHOR]: 'исполнителю',
  [FILTER_NAMES.GENRE]: 'жанру',
  [FILTER_NAMES.YEAR]: 'году выпуска',
} as const;

export const CATEGORY_TITLES: Record<string, string> = {
  '2': 'Плейлист дня',
  '3': '100 танцевальных хитов',
  '4': 'Инди-заряд',
} as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];
export type FilterName = (typeof FILTER_NAMES)[keyof typeof FILTER_NAMES];
