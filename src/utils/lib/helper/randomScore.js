const { random } = require("../until")

const randomScore = (score, maxScore = 100) => {
    const randomScore = random(1, maxScore);
    if (randomScore < score) return true;
    return false;
}

module.exports = randomScore