import { Injectable } from '@nestjs/common';
import { random } from 'src/utils/random/random';
import { downloadFile } from 'src/utils/file/downloadFile';
import youtubeDl from 'youtube-dl-exec';

@Injectable()
export class YoutubeDlService {
  getCurrentLinks = async (
    options: { url?: string; isDownload?: boolean } = { isDownload: false },
  ) => {
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
    });
    let maxFile: any = output.formats[0];
    for (const format of output.formats) {
      if (format.vcodec !== 'none' && format.acodec !== 'none') {
        if (format.filesize > maxFile?.filesize) maxFile = format;
      }
    }
    if (options.isDownload === true) {
      const d = new Date();
      path = await downloadFile(
        maxFile.url,
        'vi' + d.getTime() + '_' + random(1000, 1000000000) + '.' + maxFile.ext,
      );
    }
    return {
      tags: output.tags,
      description: output.description,
      ext: maxFile.ext,
      file: maxFile,
      path,
    };
  };
}
