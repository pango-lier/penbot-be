import { Article } from '@articles/entities/article.entity';

export class CreateFacebookDto {}

export class QueueDataFacebookDto {
  actionMethod: 'createPostArticle' | 'updateFacebookPostArticle';
  articles: Article[];
  userIds: Array<number>;
}
