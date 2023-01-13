const isUrlImage = async (url) => {
    try {
        const checkExtUrl = url.split('.');
        const type = checkExtUrl[checkExtUrl.length - 1];
        if (['png', 'jpg', 'svg', 'gif', 'pdf'].includes(type)) {
            return true;
        }

    } catch (e) {
        console.log(e.message + " . " + this.page.location);
    }
    return false;
}

module.exports = isUrlImage;