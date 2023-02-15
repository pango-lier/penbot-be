import { PostArticlePuppeteerDto } from '../../dto/create-article-puppeteer.dto';
import { CreateFacebookPostArticleDto } from './create-facebook-post-article.dto';

export class CreateFacebookDto {}

export class QueueDataFacebookDto {
  actionMethod: 'createFacebookPostArticle' | 'updateFacebookPostArticle';
  data: PostArticlePuppeteerDto;
  userIds: Array<number>;
}
