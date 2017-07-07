'use strict';
module.exports = install

var spawn = require('cross-spawn')

function install (opts) {
  opts = opts || {}
  opts.dependencies = opts.dependencies || []
  var args = ['install']
  if (opts.cliOptions) {
    args.push(opts.cliOptions)
  }
  return spawn.sync(getInstaller(), args.concat(opts.dependencies), {
    cwd: opts.cwd,
    stdio: 'inherit',
    env: process.env,
  })
}

function getInstaller () {
  var result = spawn.sync('pnpm', ['-v'])
  return result.status === 0 ? 'pnpm' : 'npm'
}
