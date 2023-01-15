import { SocialEnum } from "@socials/entities/social.enum";


export class RunCrawlerQueueOptionDto {
  pushSocial?: SocialEnum;
}

export class RunCrawlerQueueDto {
  id: Array<string | number>;
  name: string;
  options?: any;
}
