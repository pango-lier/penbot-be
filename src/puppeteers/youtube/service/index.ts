import { CoreService } from '@puppeteers/core/core.service';
import Login from './lib/Login';
import Short from './lib/Short';

class Youtube {
  core: CoreService;
  login: Login;
  short: Short;
  constructor(core: CoreService) {
    this.core = core;
    this.login = new Login(this.core);
    this.short = new Short(this.core);
  }
}
export default Youtube;
