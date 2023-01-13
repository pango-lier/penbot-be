const createFirstChannel = require("./createFirstChannel");

class Youtube {
    page;
    constructor(pup) {
        this.page = pup;
    }
    async run() {
        await createFirstChannel(this.page);
    }
}

module.exports = Youtube;