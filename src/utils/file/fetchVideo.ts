import { existsSync, mkdirSync } from 'fs';

/* eslint-disable */
const { download } = require('fetch-video');

/* eslint-disable */
const path = require('path');

export const fetchVideo = async (url, filename, requestOptions = undefined) => {
  const localFilePath = createLocalFile(filename);
  const downloader = download(url, localFilePath, requestOptions);
  downloader.on('progress', (progress) =>
    console.log(`Current progress ${progress}`),
  );
  downloader.on('speed', (speed) => console.log(`Current speed ${speed}`));
  downloader.on('stats', console.log.bind(console));
  await downloader
    .go() // Promise returned
    .then(() =>
      console.log(
        `video stream or file ${url} is downloaded and stored as the ${filename}`,
      ),
    );
  return localFilePath;
};

export const createLocalFile = (
  path: string,
  dirLocal: string = '/home/trong/Desktop/penbot/penbot-be/tmp',
): string => {
  let fileName = path;
  const folderArray = path.split('/');
  if (folderArray.length > 1) {
    fileName = folderArray[folderArray.length - 1];
    delete folderArray[folderArray.length - 1];
    dirLocal = dirLocal + '/' + folderArray.join('/');
    dirLocal = dirLocal.slice(0, -1);
  }
  if (!existsSync(`${dirLocal}`)) {
    mkdirSync(`${dirLocal}`, { recursive: true });
  }

  const fileLocal = `${dirLocal}/${fileName}`;
  return fileLocal;
};
