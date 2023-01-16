import { CoreService } from '@puppeteers/core/core.service';
import { publishContent } from './publishContent';

class Group {
  private core: CoreService;
  constructor(core: CoreService) {
    this.core = core;
  }
  async publishContent(urlGroup, content, imagePaths) {
    await this.core.goto(urlGroup.url);
    await publishContent(this.core, content, imagePaths);
  }
}
export default Group;
