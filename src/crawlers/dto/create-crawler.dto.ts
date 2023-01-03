export class CreateCrawlerDto {
  name: string;

  type?: string;

  status?: string;

  meta?: string;

  tags?: string;

  description?: string;

  links?: string;

  linkDownloaded?: string;

  crawlerLinkId?: number;
}
