import { CreateFacebookPostArticleDto } from './create-facebook-post-article.dto';

export class CreateFacebookDto {}

export class QueueDataFacebookDto {
  actionMethod: 'createPostArticle' | 'updatePostArticle';
  data: CreateFacebookPostArticleDto;
  userIds: Array<number>;
}
