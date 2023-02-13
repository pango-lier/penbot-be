import { createComments } from './CommentPost';
import { inviteOtherFriend } from './ActionOthers';
import { CoreService } from '@puppeteers/core/core.service';
import { switchPage } from './switchToPage';
import { postContent } from './post/postContent';

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
      await this.clickSwitchPage();
      await postContent(this.core, fanPage.content, fanPage.imagePaths);
    } catch (error) {
      console.log('publishContent ' + error.message);
    }
  }
  async inviteFriend() {
    await inviteOtherFriend(this.core);
  }
  async commentPost(comment: {
    content: string;
    imagePaths: string[];
    postRecentStart?: number;
    postRecentEnd?: number;
  }) {
    await createComments(
      this.core,
      comment.content,
      comment.imagePaths,
      comment.postRecentStart,
      comment.postRecentEnd,
    );
  }
}

export default FanPage;
