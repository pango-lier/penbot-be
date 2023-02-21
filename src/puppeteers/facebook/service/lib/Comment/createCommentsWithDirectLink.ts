import { CoreService } from '../../../../core/core.service';

export const createCommentsWithDirectLink = async (
  core: CoreService,
  url: string,
  content: {
    title: string;
    imageVideos?: string[];
  },
) => {
  let selector = await core.try(
    async () => {
      return await core.checkSelectors([
        '.x78zum5 > .xi81zsa > .x1n2onr6 > .xzsf02u > .xdj266r',
      ]);
    },
    5,
    1000,
  );
  if (!selector) {
    selector = await core.try(
      async () => {
        return await core.checkSelectors(['div[aria-label="Viết bình luận"]']);
      },
      5,
      1000,
    );
  }
  console.log(selector);
  await core.click(selector);
  await core.delayRandom(500, 3000);
  await core.input(content.title);
  await core.delayRandom(300, 2000);
  await core.enter();
  await core.delayRandom(500, 2000);
};
