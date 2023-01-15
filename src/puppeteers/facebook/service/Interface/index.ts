export enum ECommentType {
  index = 'index',
  random = 'random',
}

export interface ICommentType {
  type: ECommentType;
  postRecentStart: number;
  postRecentEnd?: number;
}
