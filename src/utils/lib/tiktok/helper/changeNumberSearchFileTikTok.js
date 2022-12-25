const fs = require("fs");
const { readTextToArray, parseTextData } = require("../../helper");

const changeNumberSearchFileTikTok = async (file, data) => {
    console.log("-----changeNumberSearchFileTikTok");
    const lists = readTextToArray(file);
    const name = parseTextData(lists);
    let writeFs = [];
    for (let index = 0; index < name.length; index++) {
        let element = name[index];
        if (data[0] == element[0] && data[1] == element[1]) {
            let newE = [];
            newE.push(element[0]);
            let number = parseInt(element[1]);
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


module.exports = changeNumberSearchFileTikTok