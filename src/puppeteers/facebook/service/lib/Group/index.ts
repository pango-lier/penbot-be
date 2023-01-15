import { publishContent } from './publishContent';
import { CoreService } from 'src/puppeteers/core/core.service';

class Group {
  async publishContent(page: CoreService, urlGroup, content, imagePaths) {
    await page.goto(urlGroup.url);
    await publishContent(page, content, imagePaths);
  }
}
export default Group;
