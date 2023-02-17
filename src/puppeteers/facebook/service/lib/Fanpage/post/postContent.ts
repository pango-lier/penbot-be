import { CoreService } from '@puppeteers/core/core.service';

export const postContent = async (
  core: CoreService,
  content: string,
  imagePaths: string[],
) => {
  // click pop up
  await core.delay(3);
  console.log('postContent ' + (await core.location()));
  await core.try(
    async () => { return await core.clickContentSelectorMatch('span', ['Ảnh/video']) },
    10,
    1000,
  );
  await core.delay(3);
  const selector = await core.try(
    async () => {
      return await core.checkSelectors(['div[aria-label="Bạn đang nghĩ gì?"]',
        'div[aria-label*="Viết gì đó cho"]',
        'div[aria-label="Thêm vào bài viết của bạn"]']);
    },
    30,
    1000,
  );
  console.log(selector,content);
  await core.click(selector || 'div[aria-label="Bạn đang nghĩ gì?"]');
  await core.input(content);
  console.log('upload', imagePaths);
  await core.delay(3);
  await core.uploadImageTrigger(
    imagePaths,
    core.click('.x1i10hfl > .x78zum5 > .x9f619 > .x1n2onr6 > .x9f619'),
  );

  await core.delay(13);
  const disable = await core.getAttributeSelector(
    'div[aria-label="Đăng"]',
    'aria-disabled',
  );
  console.log(disable);
  await core.delay(5);
  // watting upload video ;
  await waitingUploadVideo(core);
  await core.delay(3);
  await core.click('div[aria-label="Đăng"]');
  await core.delay(7);
  await core.page.waitForSelector(
    '.x9f619 > .x6s0dn4 > .x78zum5 > .always-enable-animations > .always-enable-animations',
    {
      hidden: true,
      timeout: 100000,
    },
  );
};

const waitingUploadVideo = async (core: CoreService) => {
  await core.try(async () => {
    const selector = `.x78zum5 > div > .x1n2onr6 > .xmjcpbm > .x117nqv4`;
    try {
      await core.page.waitForSelector(selector, { timeout: 5000 });
    } catch (error) {
      return true;
    }
    const content = await core.getContentSelector(selector);
    console.log(`Upload Facebook Video: ${content}`);
    if (content == '100%') return true;
    return false;
  }, 100); //00s
};
