import { Injectable } from '@nestjs/common';
import { downloadFileAxios } from 'src/utils/file/downloadFileAxios';
import { random } from 'src/utils/random/random';
import { IYoutubeDLServiceResponse } from './youtube-dl.interface';
import { fetchVideo } from 'src/utils/file/fetchVideo';
//import youtubeDl from 'youtube-dl-exec';
/* eslint-disable */
const youtubeDl = require('youtube-dl-exec');

@Injectable()
export class YoutubeDlService {
  command = async (
    options: { url?: string; isDownload?: boolean } = { isDownload: false },
  ): Promise<IYoutubeDLServiceResponse> => {
    let path = undefined;
    console.log(options.url);
    const output = await youtubeDl(options.url + "'", {
      dumpSingleJson: true,
      noWarnings: true,
      // noCallHome: true,
      //   noCheckCertificate: true,
      noCheckCertificates: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      referer: options.url,
      //  addHeader: [`referer:${options.url}`, 'user-agent:googlebot'],
    });
    let maxFile;
    let maxVideo;
    let maxAudio;
    console.log(output);
    for (const format of output.formats) {
      if (format.acodec === 'none') {
        if (maxVideo === undefined || format.filesize > maxVideo?.filesize)
          maxVideo = format;
      }
      if (format.vcodec === 'none') {
        if (maxAudio === undefined || format.filesize > maxAudio?.filesize)
          maxAudio = format;
      }
      if (format.vcodec !== 'none' && format.acodec !== 'none') {
        if (maxFile === undefined || format.filesize > maxFile?.filesize)
          maxFile = format;
      }
    }
    if (options.isDownload === true) {
      const d = new Date();
      path = await fetchVideo(
        maxFile.url,
        'vi' + d.getTime() + '_' + random(1000, 1000000000) + '.' + maxFile.ext,
      );
    }
    return {
      title: output.title,
      tags: output.tags,
      description: output.description,
      type: maxFile.ext,
      source: maxFile,
      linkDownloaded: path,
      size: maxFile.filesize,
      maxVideo,
      maxAudio,
      duration: output?.duration || 0,
    };
  };
  async downloadFile(url: string) {
    return await this.command({ url, isDownload: true });
  }
}
