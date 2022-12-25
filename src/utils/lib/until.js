const delay = (s) => new Promise((rs) => setTimeout(rs, s * 1000));
const delayMs = (s) => new Promise((rs) => setTimeout(rs, s));

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const delayRandomMs = async (min, max) => {
  return await delayMs(random(min, max));
};

const delayRandom = async (min, max) => {
  return await delay(random(min, max));
};

const mouseWheel = async (page) => {
  for (let i = 0; i < random(2, 8); i++) {
    await delay(random(1, 12));
    await page.mouse.wheel({ deltaY: random(0, 20) * 300 });
  }
};

module.exports.delay = delay;
module.exports.delayMs = delayMs;
module.exports.random = random;
module.exports.delayRandom = delayRandom;
module.exports.delayRandomMs = delayRandomMs;
module.exports.mouseWheel = mouseWheel;
