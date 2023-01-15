import { CoreService } from "@puppeteers/core/core.service";


export const enterUserName = async (func: CoreService, userName) => {
  await func.click('#email');
  await func.input(userName, '', 500);
};

export const enterPassword = async (func: CoreService, password) => {
  await func.click('#pass');
  await func.input(password, '', 500);
};

export const clickLogin = async (func: CoreService) => {
  await func.click('button[name="login"]');
  await func.waitForSelector(
    '.buofh1pr:nth-child(1) > .tojvnm2t > .bp9cbjyn > .oajrlxb2 > .l9j0dhe7 > .a8c37x1j',
  );
};

class Login {
  async login(func: CoreService, userName: string, password: string) {
    await func.goto('https://www.facebook.com/');
    await enterUserName(func, userName);
    await enterPassword(func, password);
    await clickLogin(func);
  }

  async goto(func: CoreService) {
    await func.goto('https://www.facebook.com/');
  }
}
export default Login;
