import { CoreService } from '@puppeteers/core/core.service';
import FanPageFacebook from './lib/Fanpage';
import GroupFacebook from './lib/Group';
import LoginFacebook from './lib/Login';

class Facebook {
  core: CoreService;
  FanPage: FanPageFacebook;
  Group: GroupFacebook;
  Login: LoginFacebook;
  constructor(core: CoreService) {
    this.core = core;
    this.FanPage = new FanPageFacebook(this.core);
    this.Group = new GroupFacebook(this.core);
    this.Login = new LoginFacebook(this.core);
  }
}
export default Facebook;
