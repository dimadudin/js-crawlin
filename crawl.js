function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    urlObj.pathname = urlObj.pathname.replace(/\/+$/, '')
    return `${urlObj.hostname}${urlObj.pathname}`
}

module.exports = {
    normalizeURL
}
