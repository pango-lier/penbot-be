
const fs = require("fs");
const { readTextToArray } = require("../helper");

const removeFirstLine = async (file) => {
    let lists = readTextToArray(file);
    lists.shift(); // remove the the first element from array
    lists = lists.join('\n'); // convert array back to string
    await fs.writeFileSync(file, lists);
}

module.exports = removeFirstLine;