const getLinkInnerWindowPage = async (links, size) => {
    links = [...new Set(links)];
    return links.filter((link) => Math.abs(link.y) <= size.h);
}

module.exports = getLinkInnerWindowPage;