import { Track } from '../sharedTypes/sharedTypes';
export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSecond = Math.floor(time % 60);
  const outputSecond = inputSecond < 10 ? `0${inputSecond}` : inputSecond;

  return `${minutes}:${outputSecond}`;
}

export const getUniqueValues = (data: Track[], key: keyof Track): string[] => {
  const allValues: string[] = [];

  data.forEach((track) => {
    const value = track[key];

    if (Array.isArray(value)) {
      allValues.push(...value);
    } else if (typeof value === 'string') {
      allValues.push(value);
    }
  });

  const uniqueValues = [...new Set(allValues)]
    .filter((value) => value.trim() !== '')
    .sort();
  return uniqueValues;
};
