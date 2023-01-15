import { CoreService } from "@puppeteers/core/core.service";


const ACTION_ORTHER =
  '.h676nmdw > .oajrlxb2 > .l9j0dhe7 > .bp9cbjyn > .rq0escxv > .a8c37x1j';
const ACTION_INVITE_FRIEND =
  '.oajrlxb2:last-child > .bp9cbjyn > .j83agx80 > .qzhwtbm6 > .d2edcug0';
const INPUT_SEARCH_FRIEND =
  '.j83agx80 > .rq0escxv > .rq0escxv > .lzcic4wl > .oajrlxb2';
const ACTION_SEARCH_FRIEND =
  '.rq0escxv:nth-child(1) > .rq0escxv:nth-child(2) > .oajrlxb2 > .l9j0dhe7 > .bp9cbjyn > .rq0escxv > .d2edcug0 > .a8c37x1j';
const ACTION_SEARCH_FRIEND_DISABLE =
  '.rq0escxv:nth-child(1) > .rq0escxv:nth-child(2) > .oajrlxb2:not([aria-disabled]) > .l9j0dhe7 > .bp9cbjyn > .rq0escxv > .d2edcug0 > .a8c37x1j';
const ACTION_CHECKBOX_FRIEND = (child = 2) =>
  `.rpm2j7zs:nth-child(1) > .j83agx80:nth-child(1) > div:nth-child(${child}) > .oajrlxb2:nth-child(1) > .ow4ym5g4:nth-child(1) > .ow4ym5g4:nth-child(2) > .n851cfcs:nth-child(2) > .bp9cbjyn:nth-child(1) > div:nth-child(1) > .hu5pjgll:nth-child(1)`;
export const ENABLE_MESSENGER =
  '.rq0escxv > .tojvnm2t > .f1sip0of > .rq0escxv > .oajrlxb2';
const ACTION_SEND_REQUEST_ADD_FRIEND =
  '.rq0escxv:nth-child(2) > .rq0escxv > .oajrlxb2 > .l9j0dhe7 > .bp9cbjyn > .rq0escxv > .d2edcug0 > .a8c37x1j';

export const inviteOtherFriend = async (pup: CoreService) => {
  await pup.clickTryCheck(ACTION_ORTHER, ACTION_INVITE_FRIEND);
  await pup.clickTryCheck(ACTION_INVITE_FRIEND, INPUT_SEARCH_FRIEND);
  await pup.click(INPUT_SEARCH_FRIEND);
  await pup.input('a');
  await pup.click(ACTION_SEARCH_FRIEND);
  await pup.waitForSelector(ACTION_SEARCH_FRIEND_DISABLE);
  for (let i = 2; i < 10; i++) {
    await pup.click(ACTION_CHECKBOX_FRIEND(i));
  }

  // await pup.click(ENABLE_MESSENGER);
  await pup.click(ACTION_SEND_REQUEST_ADD_FRIEND);
};
