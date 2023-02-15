import { Injectable } from '@nestjs/common';
import { IYoutubeDLServiceResponse } from './youtube-dl.interface';
import {
  QualityEnum,
  TypeFileEnum,
} from '../crawler-links/entities/crawler-link.enum';
import { fetchVideo } from '@utils/file/fetchVideo';
import { random } from '@utils/random/random';

//import youtubeDl = require('youtube-dl-exec');
//import youtubeDl from 'youtube-dl-exec';
/* eslint-disable */
const youtubeDl = require('youtube-dl-exec');
/* eslint-disable */
const fs = require('fs');

@Injectable()
export class YoutubeDlService {
  command = async (
    options: {
      url?: string;
      isDownload?: boolean;
      typeFile?: TypeFileEnum;
      quality?: QualityEnum;
    } = {
      isDownload: false,
      quality: QualityEnum.Video720p,
      typeFile: TypeFileEnum.FullAudioVideo,
    },
  ): Promise<IYoutubeDLServiceResponse> => {
    let path = undefined;
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
    let maxFile = {};
    let maxVideo = {};
    let maxAudio = {};

    for (const format of output.formats) {
      if (format.acodec === 'none' && format.quality) {
        maxVideo[format.quality] = format;
      }
      if (format.vcodec === 'none' && format.quality) {
        maxAudio[format.quality] = format;
      }
      if (
        format.vcodec !== 'none' &&
        format.acodec !== 'none' &&
        format.quality
      ) {
        maxFile[format.quality] = format;
      }
    }
    let fileDownload =
      maxFile[options.quality] ||
      maxFile[(options.quality as number) + 1] ||
      maxFile[(options.quality as number) - 1];
    if (options.typeFile === TypeFileEnum.OnlyAudio) {
      fileDownload =
        maxAudio[options.quality] ||
        maxAudio[(options.quality as number) + 1] ||
        maxAudio[(options.quality as number) - 1];
    } else if (options.typeFile === TypeFileEnum.OnlyVideo) {
      fileDownload =
        maxVideo[options.quality] ||
        maxVideo[(options.quality as number) + 1] ||
        maxVideo[(options.quality as number) - 1];
    }
    if (!fileDownload) {
      throw new Error(
        'Download file is Failed .Quality of video or This video is not support to download .',
      );
    }
    if (options.isDownload === true) {
      const d = new Date();
      path = await fetchVideo(
        fileDownload.url,
        'vi' +
          d.getTime() +
          '_' +
          random(1000, 1000000000) +
          '.' +
          fileDownload.ext,
      );
    }

    return {
      title: output.title ?? output.fulltitle,
      tags: output.tags,
      description: output.description ?? output.fulltitle,
      type: fileDownload.ext,
      source: fileDownload,
      linkDownloaded: path,
      size: fileDownload.filesize,
      duration: output?.duration || 0,
    };
  };
  async downloadFile(
    url: string,
    options = {
      quality: QualityEnum.Video720p,
      typeFile: TypeFileEnum.FullAudioVideo,
    },
  ) {
    return await this.command({ url, isDownload: true, ...options });
  }

  // exec = async (
  //   options: { url?: string; isDownload?: boolean } = { isDownload: false },
  // ): Promise<IYoutubeDLServiceResponse> => {
  //   let path = undefined;
  //   console.log(options.url);
  //   const output = await youtubeDl.exec(options.url + "'", {
  //     dumpSingleJson: true,
  //     noWarnings: true,
  //     // noCallHome: true,
  //     //   noCheckCertificate: true,
  //     noCheckCertificates: true,
  //     preferFreeFormats: true,
  //     youtubeSkipDashManifest: true,
  //     referer: options.url,
  //     //  addHeader: [`referer:${options.url}`, 'user-agent:googlebot'],
  //   });
  //   console.log(`Running subprocess as ${output.pid}`);
  //   console.log(output);
  //   await output.stdout.pipe(fs.createWriteStream('stdout.txt'));
  //   await output.stderr.pipe(fs.createWriteStream('stderr.txt'));

  //   return {
  //     title: output.title,
  //     tags: output.tags,
  //     description: output.description,
  //     type: 'mp4',
  //     source: 1111,
  //     linkDownloaded: path,
  //     size: 1111,
  //     duration: output?.duration || 0,
  //   };
  // };
}
