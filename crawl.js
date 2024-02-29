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

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname != currentURLObj.hostname) {
        return pages
    }
    const normalizedBaseURL = normalizeURL(baseURL)
    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages.hasOwnProperty(normalizedCurrentURL)) {
        pages[normalizedCurrentURL]++
        return pages
    }
    if (normalizedBaseURL === normalizedCurrentURL) {
        pages[normalizedCurrentURL] = 0
    } else {
        pages[normalizedCurrentURL] = 1
    }
    console.log(`crawling ${currentURL}`)
    try {
        const response = await fetch(currentURL);
        if (response.status >= 400) {
            console.log(`error in response with status code: ${response.status} on page: ${currentURL}`)
            return pages
        }
        const ctype = response.headers.get('content-type')
        if (!ctype.includes('text/html')) {
            console.log(`non html response with content type: ${ctype} on page: ${currentURL}`)
            return pages
        }
        const urls = getURLsfromHTML(await response.text(), baseURL)
        for (const url of urls) {
            pages = await crawlPage(baseURL, url, pages)
        }
        return pages
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    normalizeURL, getURLsfromHTML, crawlPage
}
