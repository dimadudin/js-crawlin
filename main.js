const { argv } = require('node:process');

function main() {
    if (argv.length < 3) {
        console.log('not enough arguments supplied');
    } else if (argv.length > 3) {
        console.log('too many arguments supplied');
    } else {
        console.log(`Initiating __C.R.A.W.L.__ at ${argv[2]}`)
    }
}

main()
