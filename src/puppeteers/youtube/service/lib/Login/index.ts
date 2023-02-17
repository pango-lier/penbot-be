import { CoreService } from '../../../../core/core.service';

export enum EnumLink {
  Home = 1,
  Short = 2,
  Subcrice = 3,
}

const links = (link: EnumLink) =>
  `.style-scope:nth-child(1) > #items > .style-scope:nth-child(${link}) > #endpoint > .style-scope`;

class Login {
  private core: CoreService;
  constructor(core: CoreService) {
    this.core = core;
  }
  async goto() {
    await this.core.goto('https://www.youtube.com/');
    await this.core.waitForSelector(links(EnumLink.Short));
  }
  async gotoShort() {
    await this.core.click(links(EnumLink.Short));
  }
  async gotoHome() {
    await this.core.click(links(EnumLink.Home));
  }

  async gotoHSubcrice() {
    await this.core.click(links(EnumLink.Subcrice));
  }
}

export default Login;
