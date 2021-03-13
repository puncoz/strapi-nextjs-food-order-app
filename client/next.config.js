const Webpackbar = require('webpackbar')

module.exports = {
    webpack: (config, { isServer }) => {
        config.plugins.push(new Webpackbar({ name: isServer ? 'server' : 'client' }))
        return config
    }
}
