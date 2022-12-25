const getSearchPageLink = async (selector, page) => {

    return await page.page.evaluate((selector) => {
        var elements = document.querySelectorAll(selector);
        let pages = [];

        if (elements) {
            for (let i = 0; i < elements.length; i++) {
                if (elements[i]?.href.search("https://www.google.com") >= 0) {
                    const position = elements[i].getBoundingClientRect();
                    const namePage = elements[i].getAttribute("aria-label");
                    if (namePage) {
                        pages.push({
                            name: namePage,
                            href: elements[i]?.href, x: position.x, y: position.y
                            , bottom: position.bottom, height: position.height, left: position.left, right: position.right
                            , top: position.top, width: position.width
                        });
                    }
                }
            }
            return pages;
        }
        return false
    }, selector);
}

module.exports = getSearchPageLink;