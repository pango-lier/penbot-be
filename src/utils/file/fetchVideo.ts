/* eslint-disable */
const { download } = require('fetch-video');

/* eslint-disable */
const path = require('path');

export const fetchVideo = async (url, filename, requestOptions = undefined) => {
  const localFilePath = path.resolve(__dirname, filename);
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
