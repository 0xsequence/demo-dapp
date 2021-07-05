const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

// appEnvVars loads the dotenv file in either client or server mode. This function
// is intended to be used as the argument to `new webpack.DefinePlugin()`.
// The app environment variables are embedded into the build for the dev or dist
// releases, however on the server, the variables can be overriden through system
// environment variables, ie. NODE_DEV=staging node dist/server
exports.appEnvVars = (envfile, opts = { server: false }) => {
  const env = {}
  const contents = fs.readFileSync(path.join(process.cwd(), envfile))
  const vars = dotenv.parse(contents)

  Object.keys(vars).forEach((key) => {
    if (opts.server) {
      env['process.env.' + key] = `process.env.${key} || '${vars[key]}'`
    } else {
      env['process.env.' + key] = `'${vars[key]}'`
    }
  })

  return env
}

// vendorEntry generates the vendor entry point for webpack based on the
// 'dependencies' in package.json. It also accepts a config object for
// keys 'mainModules' and 'modulesToExclude', sample usage:
//
// const vendor = vendorEntry({
//   mainModules: [
//     'core-js',
//      'whatwg-fetch',
//      'react-hot-loader/patch',
//      './src/index.tsx'
//   ],
//   modulesToExclude: ['my-style']
// })
exports.vendorEntry = (config) => {
  const packageJson = require('../../package.json')
  const vendorDependencies = Object.keys(packageJson['dependencies'])

  const vendorModulesMinusExclusions = vendorDependencies.filter(vendorModule => {
    console.log(vendorModule)
    config.mainModules.indexOf(vendorModule) === -1 && config.modulesToExclude.indexOf(vendorModule) === -1
  })
  console.log(vendorModulesMinusExclusions)
  return vendorModulesMinusExclusions
}
