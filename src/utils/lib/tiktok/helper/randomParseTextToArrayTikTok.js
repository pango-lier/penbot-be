const fs = require("fs");
const { readTextToArray, parseTextData } = require("../../helper");
const { random } = require("../../until");


const randomParseTextToArrayTikTok = (filename) => {
    const lists = readTextToArray(filename);
    let name = parseTextData(lists);
    name = name.filter((item) => parseInt(item[1]) > 0)
    return name[random(0, name.length - 1)];
};

module.exports = randomParseTextToArrayTikTok