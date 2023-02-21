import { CoreService } from '../../../../core/core.service';

const LIKE = ['Thích', 'Like'];
const NOT_LIKE = ['Gỡ Thích', 'DisLike'];
const SELECTOR =
  '.x1n2xptk > div > .x78zum5 > .x78zum5 > .x6s0dn4 > .x1i10hfl:nth-child(1)';
export const likeWithDirectLink = async (
  core: CoreService,
  type: 'dislike' | 'like',
) => {
  await core.delayMsRandom(200, 500);
  let content = await core.getContentSelector(SELECTOR);
  console.log(content);
  if (type === 'like') {
    if (!LIKE.includes(content)) await core.click(SELECTOR);
  }
  if (type === 'dislike') {
    if (LIKE.includes(content)) await core.click(SELECTOR);
  }
  await core.delayMsRandom(50, 100);
  content = await core.getContentSelector(SELECTOR);
  console.log(content);
};
