/* eslint-disable no-eval */
const fs = require('fs')

const Seen = {}

const filename = process.argv[2]
const content = fs.readFileSync(filename, 'utf-8')
console.log('before eval, Seen is', Seen)
eval(content)
console.log('after eval, Seen is', Seen)
