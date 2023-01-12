import { Injectable } from '@nestjs/common';
import { downloadFileAxios } from 'src/utils/file/downloadFileAxios';
import { random } from 'src/utils/random/random';
import { IYoutubeDLServiceResponse } from './youtube-dl.interface';
import { fetchVideo } from 'src/utils/file/fetchVideo';
import {
  QualityEnum,
  TypeFileEnum,
} from '../crawler-links/entities/crawler-link.enum';

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
    let maxFile;
    let maxVideo;
    let maxAudio;

    for (const format of output.formats) {
      if (format.acodec === 'none') {
        if (format.quality === options.quality) {
          maxVideo = format;
        }
      }
      if (format.vcodec === 'none') {
        if (format.quality === options.quality) {
          maxAudio = format;
        }
      }
      if (format.vcodec !== 'none' && format.acodec !== 'none') {
        if (format.quality === options.quality) {
          maxFile = format;
        }
      }
    }
    let fileDownload = maxFile;
    if (options.typeFile === TypeFileEnum.OnlyAudio) {
      fileDownload = maxAudio;
    } else if (options.typeFile === TypeFileEnum.OnlyVideo) {
      fileDownload = maxVideo;
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
      title: output.title,
      tags: output.tags,
      description: output.description,
      type: fileDownload.ext,
      source: fileDownload,
      linkDownloaded: path,
      size: fileDownload.filesize,
      maxVideo,
      maxAudio,
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
