import { data } from '../data';
import { formatTime, getTimePanel, getUniqueValues } from './helper';

describe('formatTime', () => {
  it('форматирует время правильно: 61 секунда -> 1:01', () => {
    expect(formatTime(61)).toBe('1:01');
  });

  it('форматирует время правильно: 125 секунд -> 2:05', () => {
    expect(formatTime(125)).toBe('2:05');
  });

  it('форматирует время правильно: 3600 секунд -> 60:00', () => {
    expect(formatTime(3600)).toBe('60:00');
  });

  it('добавляет ноль для секунд меньше 10', () => {
    expect(formatTime(60)).toBe('1:00');
    expect(formatTime(121)).toBe('2:01');
    expect(formatTime(185)).toBe('3:05');
  });

  it('корректно обрабатывает 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  it('корректно обрабатывает длительность из моковых данных', () => {
    expect(formatTime(data[0].duration_in_seconds)).toBe('3:25');
    expect(formatTime(data[2].duration_in_seconds)).toBe('5:05');
    expect(formatTime(data[8].duration_in_seconds)).toBe('2:15');
  });
});

describe('getTimePanel', () => {
  it('возвращает строку с текущим и общим временем', () => {
    expect(getTimePanel(61, 125)).toBe('1:01 / 2:05');
  });

  it('возвращает undefined, если totalTime не передан', () => {
    expect(getTimePanel(61, undefined)).toBeUndefined();
  });

  it('корректно форматирует время из моковых данных', () => {
    expect(getTimePanel(120, data[0].duration_in_seconds)).toBe('2:00 / 3:25');
    expect(getTimePanel(205, data[0].duration_in_seconds)).toBe('3:25 / 3:25');
  });
});

describe('getUniqueValues с моковыми данными', () => {
  describe('для поля author', () => {
    it('возвращает уникальных исполнителей из моковых данных', () => {
      const result = getUniqueValues(data, 'author');
      expect(result).toEqual([
        '-',
        'Alexander Nakarada',
        'Frank Schroter',
        'Kevin Macleod',
        'Mixkit',
        'Waltz Piano',
        'Winniethemoog',
      ]);
    });

    it('возвращает отсортированный список', () => {
      const result = getUniqueValues(data, 'author');
      expect(result[0]).toBe('-');
      expect(result[result.length - 1]).toBe('Winniethemoog');
    });

    it('содержит всех исполнителей из данных', () => {
      const result = getUniqueValues(data, 'author');

      expect(result).toContain('Alexander Nakarada');
      expect(result).toContain('Frank Schroter');
      expect(result).toContain('Kevin Macleod');
      expect(result).toContain('Mixkit');
      expect(result).toContain('-');
      expect(result).toContain('Waltz Piano');
      expect(result).toContain('Winniethemoog');

      expect(result.length).toBe(7);
    });
  });

  describe('для поля genre (массив)', () => {
    it('возвращает уникальные жанры из моковых данных', () => {
      const result = getUniqueValues(data, 'genre');

      expect(result).toEqual(['Классическая музыка']);
    });

    it('возвращает только один жанр, так как все треки классические', () => {
      const result = getUniqueValues(data, 'genre');
      expect(result.length).toBe(1);
      expect(result[0]).toBe('Классическая музыка');
    });

    it('корректно обрабатывает массив жанров', () => {
      const result = getUniqueValues(data, 'genre');
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual(['Классическая музыка']);
    });
  });

  describe('для поля album', () => {
    it('возвращает уникальные альбомы из моковых данных', () => {
      const result = getUniqueValues(data, 'album');
      expect(result).toEqual([
        '-',
        'Background Sensible',
        'Chase',
        'Cinematic',
        'Epic Heroic Conquest',
        'Open Sea epic',
        'Secret Garden',
        'Sneaky Snitch',
        'The March OF The Final Battle',
        'True Summer',
      ]);
    });

    it('содержит все альбомы из данных', () => {
      const result = getUniqueValues(data, 'album');

      expect(result).toContain('Chase');
      expect(result).toContain('Open Sea epic');
      expect(result).toContain('Sneaky Snitch');
      expect(result).toContain('Secret Garden');
      expect(result).toContain('-');
      expect(result).toContain('Epic Heroic Conquest');
      expect(result).toContain('The March OF The Final Battle');
      expect(result).toContain('True Summer');
      expect(result).toContain('Background Sensible');
      expect(result).toContain('Cinematic');

      expect(result.length).toBe(10);
    });
  });

  describe('для поля name', () => {
    it('возвращает уникальные названия треков из моковых данных', () => {
      const result = getUniqueValues(data, 'name');
      expect(result).toEqual([
        'A journey of successfull winners',
        'Background Sensible',
        'Chase',
        'Cinematic',
        'Epic Heroic Conquest',
        'Open Sea epic',
        'Secret Garden',
        'Sneaky Snitch',
        'The March OF The Final Battle',
        'True Summer',
      ]);
    });

    it('содержит все названия треков', () => {
      const result = getUniqueValues(data, 'name');

      expect(result.length).toBe(data.length);

      data.forEach((track) => {
        expect(result).toContain(track.name);
      });
    });
  });

  describe('для поля release_date', () => {
    it('возвращает уникальные даты релизов', () => {
      const result = getUniqueValues(data, 'release_date');

      expect(result).toEqual([
        '1962-01-15',
        '1972-06-06',
        '1985-02-02',
        '2003-05-12',
        '2004-10-01',
        '2005-06-11',
        '2011-11-02',
        '2012-06-01',
        '2019-06-12',
        '2022-04-16',
      ]);

      expect(result.length).toBe(data.length);
    });
  });

  describe('граничные случаи с моковыми данными', () => {
    it('обрабатывает автора "-" как обычное значение', () => {
      const result = getUniqueValues(data, 'author');
      expect(result).toContain('-');

      const tracksWithDash = data.filter((track) => track.author === '-');
      expect(tracksWithDash.length).toBe(4);
    });

    it('возвращает пустой массив для пустого входного массива', () => {
      const result = getUniqueValues([], 'author');
      expect(result).toEqual([]);
    });

    it('корректно обрабатывает дубликаты при передаче копии данных', () => {
      const duplicateData = [...data, ...data];
      const result = getUniqueValues(duplicateData, 'author');

      expect(result).toEqual(getUniqueValues(data, 'author'));
      expect(result.length).toBe(7);
    });

    it('фильтрует пустые строки (в данных нет пустых, но тестируем логику)', () => {
      const dataWithEmpty = [
        ...data,
        {
          _id: 99,
          name: 'Empty Track',
          author: '',
          release_date: '2020-01-01',
          genre: [''],
          duration_in_seconds: 180,
          album: '',
          logo: null,
          track_file: 'empty.mp3',
          stared_user: [],
        },
      ];

      const authorResult = getUniqueValues(dataWithEmpty, 'author');
      expect(authorResult).not.toContain('');

      const genreResult = getUniqueValues(dataWithEmpty, 'genre');
      expect(genreResult).not.toContain('');

      const albumResult = getUniqueValues(dataWithEmpty, 'album');
      expect(albumResult).not.toContain('');
    });
  });
});
