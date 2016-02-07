const path = require('path');

module.exports = function(config) {
    const karamConfig = require('./karma.config.base')();

    karamConfig.reporters = ['mocha',];
    karamConfig.plugins.push();
    karamConfig.logLevel = config.LOG_INFO,

    config.set(karamConfig);
}
