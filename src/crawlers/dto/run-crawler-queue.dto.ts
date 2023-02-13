import { CrawlerLink } from "@crawlers/crawler-links/entities/crawler-link.entity";
import { SocialEnum } from "@socials/entities/social.enum";


export class RunCrawlerQueueOptionDto {
  pushSocial?: SocialEnum;
}

export class RunCrawlerQueueDto {
  ids: Array<string | number>;
  commands?: string;
  options?: any;
}
