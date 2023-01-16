import { CoreService } from '@puppeteers/core/core.service';

const ACTION_SWITCH_PAGE = 'div[aria-label="Chuyển ngay"]';

export const switchPage = async (core: CoreService) => {
  await core.delay(2);
  if (
    await core.try(
      async () => {
        return await core.checkSelector(ACTION_SWITCH_PAGE);
      },
      5,
      1000,
    )
  ) {
    await core.click(ACTION_SWITCH_PAGE);
  }
};
