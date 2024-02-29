const { normalizeURL } = require('./crawl.js')

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
