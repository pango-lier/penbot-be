import { random } from './random';

export const delay = (s: number) =>
  new Promise((rs) => setTimeout(rs, s * 1000));
export const delayMs = (s: number) => new Promise((rs) => setTimeout(rs, s));

export const delayRandomMs = async (min: number, max: number) => {
  return await delayMs(random(min, max));
};

export const delayRandom = async (min: number, max: number) => {
  return await delay(random(min, max));
};

// const mouseWheel = async (page) => {
//   for (let i = 0; i < random(2, 8); i++) {
//     await delay(random(1, 12));
//     await page.mouse.wheel({ deltaY: random(0, 20) * 300 });
//   }
// };
