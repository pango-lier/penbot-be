import { createComments } from './CommentPost';
import { inviteOtherFriend } from './ActionOthers';
import { CoreService } from '@puppeteers/core/core.service';
import { switchPage } from './switchToPage';
import { postContent } from './post/postContent';
import {
  IComment,
  createCommentsWithDirectLink,
} from '../Comment/createCommentsWithDirectLink';

class FanPage {
  private core: CoreService;
  constructor(core: CoreService) {
    this.core = core;
  }
  async goto(url: string) {
    await this.core.goto(url);
  }

  async clickSwitchPage() {
    await switchPage(this.core);
  }

  async publishContent(fanPage: {
    content: string;
    imagePaths?: string[];
    type?: undefined | 'video' | 'image';
  }) {
    try {
      // await this.goto('https://www.facebook.com/watch/?v=1360543028045142');
      // await this.core.delay(2);
      // await this.commentPost([
      //   {
      //     title: 'làm thế ai mà dám làm . Nam mô A di đà phật @@',
      //   },
      // ]);
      await this.clickSwitchPage();
      await postContent(this.core, fanPage.content, fanPage.imagePaths);
    } catch (error) {
      console.log('publishContent ' + error.message);
    }
  }
  async inviteFriend() {
    await inviteOtherFriend(this.core);
  }

  async commentPost(comments: IComment[]) {
    await createCommentsWithDirectLink(this.core, comments);
  }
}

export default FanPage;
