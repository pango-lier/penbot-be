const getLinkInnerWindow = async (positionCurrent, links, size, isGoogle = true) => {
    let offsetY = 0;
    links = [...new Set(links)];
    return links.filter((link) => link.href !== "/" && Math.abs(link.y) >= (Math.abs(positionCurrent.y) - 150) && Math.abs(link.y) <= Math.abs(positionCurrent.y + size.h + 50) && (!isGoogle || isGoogle && link.x < size.w / 2));
}

module.exports = getLinkInnerWindow;