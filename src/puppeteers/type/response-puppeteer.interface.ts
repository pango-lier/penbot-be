export interface SocialResponse {
  status: 'error' | 'success' | 'warning';
  message?: string;
  [key: string]: any;
}
