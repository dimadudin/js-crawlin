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

async function crawlPage(currentURL) {
    console.log(`crawling ${currentURL}`)
    try {
        const response = await fetch(currentURL);
        if (response.status >= 400) {
            console.log(`error in response with status code: ${response.status} on page: ${currentURL}`)
            return
        }
        const ctype = response.headers.get('content-type')
        if (!ctype.includes('text/html')) {
            console.log(`non html response with content type: ${ctype} on page: ${currentURL}`)
            return
        }
        console.log(await response.text())
    } catch (err) {
        console.log(err.message)
    }
}
module.exports = {
    normalizeURL, getURLsfromHTML, crawlPage
}
