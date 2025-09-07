export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSecond = Math.floor(time % 60);
  const outputSecond = inputSecond < 10 ? `0${inputSecond}` : inputSecond;

  return `${minutes}:${outputSecond}`;
}
