import { random } from './random';

export const randomScore = (score, maxScore = 100) => {
  const randomScore = random(1, maxScore);
  if (randomScore < score) return true;
  return false;
};
