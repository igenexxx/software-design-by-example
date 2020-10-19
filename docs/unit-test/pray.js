const minimist = require('minimist')
const glob = require('glob')
const hope = require('./hope')

const DEFAULTS = {
  filenames: [],
  root: '.',
  output: 'terse'
}

const main = (args) => {
  const options = parse(args)
  if (options.filenames.length === 0) {
    options.filenames = glob.sync(`${options.root}/**/test-*.js`)
  }
  options.filenames.forEach(f => {
    require(f)
  })
  hope.run()
  const result = (options.output === 'terse')
    ? hope.terse()
    : hope.verbose()
  console.log(result)
}

const parse = (args) => {
  const options = Object.assign({}, DEFAULTS)
  const argv = minimist(args)
  for (const key in argv) {
    switch (key) {
      case 'd' :
        options.root = argv[key]
        break
      case 'v' :
        options.output = 'verbose'
        break
      case '_':
        options.filenames = argv[key]
        break
      default :
        console.error(`unrecognized option ${key}`)
        break
    }
  }
  return options
}

main(process.argv.slice(2))