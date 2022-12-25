import * as stream from 'stream';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

export const downloadFileAxios = async (fileUrl, fileName) => {
  // Get the file name
  // The path of the downloaded file on our machine
  const localFilePath = path.resolve(__dirname, fileName);
  const finished = promisify(stream.finished);
  const writer = fs.createWriteStream(localFilePath);
  return axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then((response) => {
    const totalLength = response.headers['content-length'];
    console.log(totalLength);
    response.data.pipe(writer);
    return finished(writer); //this is a Promise
  });
};
