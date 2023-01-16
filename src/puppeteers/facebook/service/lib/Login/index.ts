import { CoreService } from '@puppeteers/core/core.service';
import { delayMs } from '@puppeteers/core/lib/until';

export const enterUserName = async (func: CoreService, userName) => {
  await func.click('#email');
  await func.input(userName, '', 500);
};

export const enterPassword = async (func: CoreService, password) => {
  await func.click('#pass');
  await func.input(password, '', 500);
};

export const enterLogin = async (func: CoreService) => {
  await delayMs(500);
  if (await func.checkSelector('button[name="login"]')) {
    await delayMs(500);
    await func.click('button[name="login"]');
  } else await func.enter();
  await func.waitForSelector('a[href*="/watch"]');
};

class Login {
  private core: CoreService;
  constructor(core: CoreService) {
    this.core = core;
  }
  async login(
    userName: string,
    password: string,
    url = 'https://www.facebook.com/',
  ) {
    console.log('facebook:login');
    await this.core.goto(url);
    await delayMs(1000);
    if (await this.core.checkSelector('#email')) {
      try {
        await enterUserName(this.core, userName);
        await enterPassword(this.core, password);
        await enterLogin(this.core);
        await delayMs(1000);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  async goto(url = 'https://www.facebook.com/') {
    await this.core.goto(url);
  }
}
export default Login;
