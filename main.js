const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js')

function main() {
    if (argv.length < 3) {
        console.log('no website provided');
        process.exit(1)
    }
    if (argv.length > 3) {
        console.log('too many command line args');
        process.exit(1)
    }
    const baseURL = argv[2]
    console.log(`Initiating __C.R.A.W.L.__ at ${baseURL}`)
    pages = crawlPage(baseURL, baseURL, {})
}

main()
