import { applyFilters } from './applyFilters';
import { data } from '../data';
import { initialStateType } from '../store/features/trackSlice';

describe('applyFilters', () => {
  const createMockState = (overrides = {}): initialStateType => ({
    currentTrack: null,
    isPlay: false,
    isShuffle: false,
    playlist: [],
    shuffledPlaylist: [],
    currentTrackIndex: -1,
    favoriteTracks: [],
    allTracks: data,
    fetchError: null,
    fetchIsLoading: false,
    filteredTracks: [],
    pagePlaylist: data,
    searchQuery: '',
    filters: {
      authors: [],
      genres: [],
      years: 'По умолчанию',
    },
    ...overrides,
  });

  it('возвращает все треки, если нет фильтров', () => {
    const state = createMockState();
    const result = applyFilters(state);

    expect(result).toHaveLength(data.length);
    expect(result).toEqual(data);
  });

  it('фильтрует по автору', () => {
    const state = createMockState({
      filters: {
        authors: ['Alexander Nakarada'],
        genres: [],
        years: 'По умолчанию',
      },
    });

    const result = applyFilters(state);

    expect(result).toHaveLength(1);
    expect(result[0].author).toBe('Alexander Nakarada');
    expect(result[0].name).toBe('Chase');
  });

  it('фильтрует по нескольким авторам', () => {
    const state = createMockState({
      filters: {
        authors: ['Alexander Nakarada', 'Kevin Macleod'],
        genres: [],
        years: 'По умолчанию',
      },
    });

    const result = applyFilters(state);

    expect(result).toHaveLength(2);
    expect(result.map((t) => t.author)).toEqual([
      'Alexander Nakarada',
      'Kevin Macleod',
    ]);
  });

  it('фильтрует по жанру', () => {
    const state = createMockState({
      filters: {
        authors: [],
        genres: ['Классическая музыка'],
        years: 'По умолчанию',
      },
    });

    const result = applyFilters(state);

    expect(result).toHaveLength(data.length);
    expect(result[0].genre).toContain('Классическая музыка');
  });

  it('фильтрует по поисковому запросу', () => {
    const state = createMockState({
      searchQuery: 'chase',
    });

    const result = applyFilters(state);

    expect(result).toHaveLength(1);
    expect(result[0].name.toLowerCase()).toContain('chase');
  });

  it('поиск работает без учета регистра', () => {
    const state = createMockState({
      searchQuery: 'CHASE',
    });

    const result = applyFilters(state);

    expect(result).toHaveLength(1);
    expect(result[0].name.toLowerCase()).toContain('chase');
  });

  it('поиск по автору', () => {
    const state = createMockState({
      searchQuery: 'nakarada',
    });

    const result = applyFilters(state);

    expect(result).toHaveLength(1);
    expect(result[0].author.toLowerCase()).toContain('nakarada');
  });

  it('комбинирует поиск и фильтр по автору', () => {
    const state = createMockState({
      searchQuery: 'epic',
      filters: {
        authors: ['Frank Schroter'],
        genres: [],
        years: 'По умолчанию',
      },
    });

    const result = applyFilters(state);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Open Sea epic');
    expect(result[0].author).toBe('Frank Schroter');
  });

  it('сортирует по году (сначала новые)', () => {
    const state = createMockState({
      filters: {
        authors: [],
        genres: [],
        years: 'Сначала новые',
      },
    });

    const result = applyFilters(state);

    expect(result[0].release_date).toBe('2022-04-16');
    expect(result[0].name).toBe('Sneaky Snitch');
  });

  it('сортирует по году (сначала старые)', () => {
    const state = createMockState({
      filters: {
        authors: [],
        genres: [],
        years: 'Сначала старые',
      },
    });

    const result = applyFilters(state);

    expect(result[0].release_date).toBe('1962-01-15');
    expect(result[0].name).toBe('Epic Heroic Conquest');
  });

  it('возвращает пустой массив, если нет pagePlaylist', () => {
    const state = createMockState({
      pagePlaylist: [],
    });

    const result = applyFilters(state);
    expect(result).toEqual([]);
  });

  it('возвращает пустой массив, если фильтры не дали результатов', () => {
    const state = createMockState({
      filters: {
        authors: ['Несуществующий автор'],
        genres: [],
        years: 'По умолчанию',
      },
    });

    const result = applyFilters(state);
    expect(result).toEqual([]);
  });

  it('не изменяет исходный массив', () => {
    const originalPlaylist = [...data];
    const state = createMockState();

    applyFilters(state);

    expect(originalPlaylist).toEqual(data);
  });

  it('корректно работает с пустым поисковым запросом', () => {
    const state = createMockState({
      searchQuery: '   ',
    });

    const result = applyFilters(state);

    expect(result).toHaveLength(data.length);
  });

  it('фильтрует по нескольким жанрам (если они появятся)', () => {
    const extendedData = [
      ...data,
      {
        _id: 100,
        name: 'Rock Track',
        author: 'Rock Artist',
        release_date: '2023-01-01',
        genre: ['rock', 'metal'],
        duration_in_seconds: 200,
        album: 'Rock Album',
        logo: null,
        track_file: 'rock.mp3',
        stared_user: [],
      },
    ];

    const state = createMockState({
      pagePlaylist: extendedData,
      filters: {
        authors: [],
        genres: ['rock', 'metal'],
        years: 'По умолчанию',
      },
    });

    const result = applyFilters(state);

    expect(result).toHaveLength(1);
    expect(result[0].genre).toContain('rock');
    expect(result[0].genre).toContain('metal');
  });
});
