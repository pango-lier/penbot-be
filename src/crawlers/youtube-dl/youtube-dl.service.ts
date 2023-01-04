import { Injectable } from '@nestjs/common';
import { downloadFileAxios } from 'src/utils/file/downloadFileAxios';
import { random } from 'src/utils/random/random';
import youtubeDl from 'youtube-dl-exec';
import { IYoutubeDLServiceResponse } from './youtube-dl.interface';
import { url } from 'inspector';

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
    });
    let maxFile: any = output.formats[0];
    for (const format of output.formats) {
      if (format.vcodec !== 'none' && format.acodec !== 'none') {
        if (format.filesize > maxFile?.filesize) maxFile = format;
      }
    }
    if (options.isDownload === true) {
      const d = new Date();
      path = await downloadFileAxios(
        maxFile.url,
        'vi' + d.getTime() + '_' + random(1000, 1000000000) + '.' + maxFile.ext,
      );
    }
    return {
      tags: output.tags,
      description: output.description,
      type: maxFile.ext,
      source: maxFile,
      linkDownloaded: path,
      size: maxFile.filesize,
    };
  };
  async downloadFile(url: string) {
    return await this.command({ url, isDownload: true });
  }
}
