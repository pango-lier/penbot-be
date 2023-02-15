export class CreateFacebookPostArticleDto {
  username: string;
  password: string;
  target: string;
  content: string;
  imagePaths: string[];
  tags?: string[];
  [key: string]: any;
}
