const findDomain = async (links, domain) => {
    for (const link of links) {
        if (link.href.search(domain) >= 0) return link;
    }
    return false;
}

module.exports = findDomain;