import { CoreService } from '@puppeteers/core/core.service';

export const postContent = async (
  core: CoreService,
  content: string,
  imagePaths: string[],
) => {
  // click pop up
  await core.delay(3);
  await core.try(
    async () => await core.clickContentSelectorMatch('span', ['Ảnh/video']),
    5,
    2000,
  );
  await core.delay(3);
  await core.click('div[aria-label="Bạn đang nghĩ gì?"]');
  await core.input(content);
  console.log('upload', imagePaths);
  await core.delay(3);
  await core.uploadImageTrigger(
    imagePaths,
    core.click('.x1i10hfl > .x78zum5 > .x9f619 > .x1n2onr6 > .x9f619'),
  );

  await core.delay(15);
  const disable = await core.getAttributeSelector(
    'div[aria-label="Đăng"]',
    'aria-disabled',
  );
  console.log(disable);
  await core.click('div[aria-label="Đăng"]');
  await core.delay(200);
};
// core.try(
//   async () =>
//     await core.clickContentSelectorMatch('span', [
//       'Thêm ảnh/video',
//       'hoặc kéo và thả',
//     ]),
//   5,
//   1000,
// ),
