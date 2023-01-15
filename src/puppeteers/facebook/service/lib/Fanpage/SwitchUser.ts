import { CoreService } from "@puppeteers/core/core.service";


const ACTION_SELECT_INTERACT =
  '.oajrlxb2 > .l9j0dhe7 > .bp9cbjyn > .rq0escxv:nth-child(2) > .hu5pjgll';
const ACTION_SELECT = (st) =>
  `.oajrlxb2:nth-child(${st}) > .bp9cbjyn > .j83agx80 > .qzhwtbm6 > .d2edcug0`;

enum EActionSelectInteractFanpage {
  page = 1,
  user = 2,
}

class SwitchUser {
  async selectUser(pup: CoreService) {
    await this.select(pup, EActionSelectInteractFanpage.user);
  }
  async select(func: CoreService, index: number) {
    await func.clickTryCheck(ACTION_SELECT_INTERACT, ACTION_SELECT);
    await func.click(ACTION_SELECT(index));
    await func.delay(2);
  }
}

export default new SwitchUser();
