import { TrackType } from '../sharedTypes/sharedTypes';
export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSecond = Math.floor(time % 60);
  const outputSecond = inputSecond < 10 ? `0${inputSecond}` : inputSecond;

  return `${minutes}:${outputSecond}`;
}

export const getTimePanel = (
  currentTime: number,
  totalTime: number | undefined,
) => {
  if (totalTime) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
  }
};

export const getUniqueValues = (
  data: TrackType[],
  key: keyof TrackType,
): string[] => {
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
