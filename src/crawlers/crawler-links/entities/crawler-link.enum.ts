export enum CrawlerLinkEnum {
  Auto = 'Auto',
  Normal = 'Normal',
}

export enum QualityEnum {
  Video240p = 5,
  Video360p = 6,
  Video480p = 7,
  Video720p = 8,
  Video1080p = 9,
  VideoBest = 'best',
}

export enum TypeFileEnum {
  OnlyVideo = 'video',
  OnlyAudio = 'audio',
  FullAudioVideo = 'video_audio',
}

export enum CrawlerLinkStatusEnum {
  None = 'none',
  Pending = 'pending',
  Warning = 'warning',
  Error = 'error',
  Processing = 'processing',
  Success = 'success',
}
