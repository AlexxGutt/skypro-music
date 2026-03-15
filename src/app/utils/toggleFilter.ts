export const toggleFilterInArray = (
  currentArray: string[],
  value: string,
): string[] => {
  if (currentArray.includes(value)) {
    return currentArray.filter((item) => item !== value);
  } else {
    return [...currentArray, value];
  }
};
