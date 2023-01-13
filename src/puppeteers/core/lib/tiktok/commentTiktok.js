const addCommentDirectLink = require("./comment/addCommentDirectLink");

const commentTikTok = async (page,config) => {
    await addCommentDirectLink(page, config);
}
module.exports = commentTikTok;