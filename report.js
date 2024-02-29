function printReport(pages) {
    console.log('Initiating report');
    const sortableLinks = []
    for (const url in pages) {
        sortableLinks.push([url, pages[url]])
    }
    sortableLinks.sort((a, b) => (a[1] - b[1]));
    sortableLinks.forEach((a) => { console.log(`Found ${a[1]} internal links to ${a[0]}`) })
}

module.exports = {
    printReport
}
