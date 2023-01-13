const findLinkPageByName = async (links, pageNumber) => {
    for (const link of links) {
        if (link.name.search("Page " + pageNumber) >= 0) return link;
    }
    return false;
}

module.exports = findLinkPageByName;