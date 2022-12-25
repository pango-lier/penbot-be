const fs = require("fs");
const { random } = require("../until");

const getAllPaths = (dir) => {
  const fullPaths = [];
  try {
    var files = fs.readdirSync(dir);
    for (var i in files) {
      var name = dir + "/" + files[i];
      fullPaths.push(name);
    }
  } catch (error) {
    console.log("getAllPaths", error);
  }
  return fullPaths;
};

const randomAvatar = (dir) => {
  let path = undefined;
  try {
    const paths = getAllPaths(dir);
    let i = 0;
    while (i < 5) {
      const index = random(0, paths.length - 1);
      path = paths[index];
      console.log(path);
      if (path) break;
      i++;
    }
  } catch (error) {
    console.log("randomAvatar", error);
  }
  return path;
};

const readTextToArray = (filename) => {
  const contents = fs.readFileSync(filename, "utf-8");
  return contents.split(/\r?\n/);
};

const parseTextData = (lists) => {
  const data = lists
    .filter((i) => i.trim() !== "")
    .map((item) => {
      return item.split("|");
    });

  return data;
};

const changeNameFileSameFolder = (fileDir, newName) => {
  const data = fileDir.split("/");
  delete data[data.length - 1];
  return data.join('/') + newName;
};


const randomParseTextToArray = (filename) => {
  const lists = readTextToArray(filename);
  const name = parseTextData(lists);
  return name[random(0, name.length - 1)];
};

const readTextParseToArray = (filename) => {
  const lists = readTextToArray(filename);
  return parseTextData(lists);
};

const findEmailInfo = (filename, sttAcc) => {
  const lists = readTextToArray(filename);
  const name = parseTextData(lists);
  for (let index = 0; index < name.length; index++) {
    const element = name[index];
    if (index == sttAcc) {
      return element;
    }

  }
  return false;
};


const changePasswordFile = async (file, sttAcc, newPwd, folder) => {
  console.log("-----changePasswordFile");
  const lists = readTextToArray(file);
  const name = parseTextData(lists);
  let writeFs = [];
  const arFiles = file.split("/");
  // const folder = arFiles[arFiles.length - 2];
  for (let index = 0; index < name.length; index++) {
    let element = name[index];
    if (index === sttAcc) {
      let newE = [];
      newE.push(element[0]);
      newE.push(newPwd);
      newE.push(element[2]);
      newE.push("");
      newE.push(folder);
      element = newE;
    }
    element = element.join('|');
    writeFs.push(element);
  }
  writeFs = writeFs.join('\n'); // convert array back to string
  await fs.writeFileSync(file, writeFs);
}

const writeXLoginFailed = async (file, sttAcc, folder, strFail = 'x') => {
  console.log("-----writeXLoginFailed");
  const lists = readTextToArray(file);
  const name = parseTextData(lists);
  let writeFs = [];
  const arFiles = file.split("/");
  // const folder = arFiles[arFiles.length - 2];
  for (let index = 0; index < name.length; index++) {
    let element = name[index];
    if (index == sttAcc) {
      element[3] = strFail;
      element[4] = folder;
    }
    element = element.join('|');
    writeFs.push(element);
  }

  writeFs = writeFs.join('\n'); // convert array back to string

  await fs.writeFileSync(file, writeFs);
}

const getAllFolderPaths = (dir) => {
  const fullPaths = [];
  try {
    const folders = fs.readdirSync(dir, { withFileTypes: true })
      .filter((item) => item.isDirectory())
      .map((item) => item.name);
    for (var i in folders) {
      fullPaths.push(getAllPaths(dir + '/' + folders[i]));
    }
  } catch (error) {
    console.log("getAllPaths", error);
  }
  console.log(fullPaths);
  return fullPaths;
};


const randomFileFolder = (dir) => {
  const folders = getAllFolderPaths(dir)
  const files = folders[random(0, folders.length - 1)];
  const file = files[random(0, files.length - 1)];
  console.log(file);
  return file;
};

const changeNumberSearchFile = async (file, data) => {
  console.log("-----changeNumberSearchFile");
  const lists = readTextToArray(file);
  const name = parseTextData(lists);
  let writeFs = [];
  for (let index = 0; index < name.length; index++) {
    let element = name[index];
    if (data[0] == element[0] && data[1] == element[1] && data[2] == element[2]) {
      let newE = [];
      newE.push(element[0]);
      newE.push(element[1]);
      let number = parseInt(element[2]);
      if (number > 0) number--;
      else number = 0;
      newE.push(number);
      element = newE;
    }
    element = element.join('|');
    writeFs.push(element);
  }
  writeFs = writeFs.join('\n'); // convert array back to string
  await fs.writeFileSync(file, writeFs);
}

const randomParseTextToArrayFilterGoogleSearch = (filename) => {
  const lists = readTextToArray(filename);
  let name = parseTextData(lists);
  name = name.filter((item) => parseInt(item[2]) > 0)
  return name[random(0, name.length - 1)];
};

module.exports.getAllPaths = getAllPaths;
module.exports.randomAvatar = randomAvatar;
module.exports.readTextToArray = readTextToArray;
module.exports.parseTextData = parseTextData;
module.exports.randomParseTextToArray = randomParseTextToArray;
module.exports.findEmailInfo = findEmailInfo;
module.exports.changePasswordFile = changePasswordFile;
module.exports.writeXLoginFailed = writeXLoginFailed;
module.exports.getAllFolderPaths = getAllFolderPaths;
module.exports.randomFileFolder = randomFileFolder;
module.exports.changeNumberSearchFile = changeNumberSearchFile;
module.exports.randomParseTextToArrayFilterGoogleSearch = randomParseTextToArrayFilterGoogleSearch;
module.exports.readTextParseToArray = readTextParseToArray;
module.exports.changeNameFileSameFolder = changeNameFileSameFolder;
