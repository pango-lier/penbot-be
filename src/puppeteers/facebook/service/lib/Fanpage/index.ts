import { CoreService } from 'src/puppeteers/core/core.service';
import { publishContent } from './publishContent';
import { createComments } from './CommentPost';
import { inviteOtherFriend } from './ActionOthers';

class FanPage {
  async goto(pup: CoreService, url: string) {
    await pup.goto(url);
  }
  async publishContent(
    pup: CoreService,
    fanPage: {
      content: string;
      imagePaths?: string[];
      type?: undefined | 'video' | 'image';
    },
  ) {
    await publishContent(
      pup,
      fanPage.content,
      fanPage.imagePaths,
      fanPage.type,
    );
  }
  async inviteFriend(pup: CoreService) {
    await inviteOtherFriend(pup);
  }
  async commentPost(
    pup: CoreService,
    comment: {
      content: string;
      imagePaths: string[];
      postRecentStart?: number;
      postRecentEnd?: number;
    },
  ) {
    await createComments(
      pup,
      comment.content,
      comment.imagePaths,
      comment.postRecentStart,
      comment.postRecentEnd,
    );
  }
}

export default FanPage;
