import { CoreService } from '@puppeteers/core/core.service';
import { publishContent } from './publishContent';

class Group {
  async publishContent(page: CoreService, urlGroup, content, imagePaths) {
    await page.goto(urlGroup.url);
    await publishContent(page, content, imagePaths);
  }
}
export default Group;
