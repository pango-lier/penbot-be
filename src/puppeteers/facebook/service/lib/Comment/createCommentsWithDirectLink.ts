import { CoreService } from '../../../../core/core.service';

export interface IComment {
  title: string;
  url?: string;
  imageVideos?: string[];
}

export const createCommentsWithDirectLink = async (
  core: CoreService,
  comments: IComment[],
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
  for (const comment of comments) {
    console.log(selector);
    await core.click(selector);
    await core.delayMsRandom(500, 3000);
    await core.input(comment.title);
    await core.delayMsRandom(300, 2000);
    await core.enter();
    await core.delayMsRandom(500, 2000);
  }
};
