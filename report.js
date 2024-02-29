function printReport(pages) {
    console.log('Initiating report');
    const sortableLinks = Object.entries(pages)
    sortableLinks.sort((a, b) => (b[1] - a[1]));
    sortableLinks.forEach((a) => { console.log(`Found ${a[1]} internal links to ${a[0]}`) })
}

module.exports = {
    printReport
}
