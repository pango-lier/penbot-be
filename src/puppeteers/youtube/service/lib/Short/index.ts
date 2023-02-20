import { CoreService } from '../../../../core/core.service';

const BUTTON_DOWN = 'button[aria-label="Next video"]';
class Short {
  private core: CoreService;
  constructor(core: CoreService) {
    this.core = core;
  }
  async getLink(options: { offset: number }) {
    const currentUrl = () => {
      return window.location.href;
    };
    const currentContent = (options) => {
      const element = document.querySelector(
        `#\\${
          options.offset + 30
        } > .overlay > .style-scope > #overlay > .style-scope > .title > .style-scope`,
      );
      if (element) {
        return element.textContent;
      }
      return null;
    };
    const href: string = await this.core.page.evaluate(currentUrl);
    const content: string | null = await this.core.page.evaluate(
      currentContent,
      options,
    );
    return { href: href, content: content };
  }
  async clickBtnDown() {
    await this.core.click(BUTTON_DOWN);
  }
}
export default Short;
