import { toggleFilterInArray } from './toggleFilter';

describe('toggleFilterInArray', () => {
  test('добавляет значение, если его нет в массиве', () => {
    const arr = ['a', 'b'];
    const result = toggleFilterInArray(arr, 'c');
    expect(result).toEqual(['a', 'b', 'c']);
  });

  test('удаляет значение, если оно есть в массиве', () => {
    const arr = ['a', 'b', 'c'];
    const result = toggleFilterInArray(arr, 'b');
    expect(result).toEqual(['a', 'c']);
  });

  test('не мутирует исходный массив', () => {
    const arr = ['a', 'b'];
    const result = toggleFilterInArray(arr, 'c');
    expect(arr).toEqual(['a', 'b']);
    expect(result).not.toBe(arr);
  });

  test('работает с пустым массивом', () => {
    const result = toggleFilterInArray([], 'a');
    expect(result).toEqual(['a']);
  });
});
