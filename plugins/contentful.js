// ./plugins/contentful.js

const contentful = require('contentful')
// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js
const config = {
  space: '29aa304oxj30',
  accessToken: 'A8vBlLDDD-SLpkfrTDxcS1laLw2j9bZ_glD6K1HkPjA',
}

// export `createClient` to use it in page components
module.exports = {
  createClient () {
    return contentful.createClient(config)
  }
}

