const { normalizeURL, getURLsfromHTML } = require('./crawl.js')

test('normalizeURL strip https protocol', () => {
    const input = 'https://boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toBe(expected)
})

test('normalizeURL strip http protocol', () => {
    const input = 'http://boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toBe(expected)
})

test('normalizeURL strip trailing /', () => {
    const input = 'https://boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toBe(expected)
})

test('normalizeURL strip trailing ////....', () => {
    const input = 'https://boot.dev/path/////'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toBe(expected)
})

test('normalizeURL toLowerCase', () => {
    const input = 'https://BOOT.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toBe(expected)
})

test('getURLsfromHTML absolute URLs', () => {
    const inputHTML = `
<html>
    <body>
        <a href="https://blog.boot.dev/path/"><span>Go to Boot.dev</span></a>
    </body>
</html>
`
    const inputBaseURL = 'https://blog.boot.dev/path/'
    const actual = getURLsfromHTML(inputHTML, inputBaseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toStrictEqual(expected)
})

test('getURLsfromHTML relative URLs', () => {
    const inputHTML = `
<html>
    <body>
        <a href="/path/"><span>Go to Boot.dev</span></a>
    </body>
</html>
`
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsfromHTML(inputHTML, inputBaseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toStrictEqual(expected)
})

test('getURLsfromHTML absolute AND relative URLs', () => {
    const inputHTML = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1/"><span>Go to Boot.dev path 1</span></a>
        <a href="/path2/"><span>Go to Boot.dev path 2</span></a>
    </body>
</html>
`
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsfromHTML(inputHTML, inputBaseURL)
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
    expect(actual).toStrictEqual(expected)
})


test('getURLsfromHTML invalid', () => {
    const inputHTML = `
<html>
    <body>
    <a href="invalid"><span>Invalid URL</span></a>
    </body>
</html>
`
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsfromHTML(inputHTML, inputBaseURL)
    const expected = []
    expect(actual).toStrictEqual(expected)
})
