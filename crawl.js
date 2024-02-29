const { JSDOM } = require('jsdom')

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    urlObj.pathname = urlObj.pathname.replace(/\/+$/, '')
    return `${urlObj.hostname}${urlObj.pathname}`
}

function getURLsfromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElems = dom.window.document.querySelectorAll('a')
    for (const elem of linkElems) {
        if (elem.href[0] === '/') {
            try {
                const urlObj = new URL(`${baseURL}${elem.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative URL: ${err.message}`)
            }
        } else {
            try {
                const urlObj = new URL(elem.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative URL: ${err.message}`)
            }
        }
    }
    return urls
}

module.exports = {
    normalizeURL, getURLsfromHTML
}
