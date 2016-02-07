const path = require('path');

module.exports = function(config) {
    const karamConfig = require('./karma.config.base')();

    karamConfig.reporters = ['coverage',];
    karamConfig.coverageReporter = {
        dir: 'coverage',
        reporters: [
            {type: 'html', subdir: '.',},
            {type: 'text',},
            {type: 'text-summary',},
        ],
    };
    karamConfig.webpack.module.preLoaders = [
        {
            test: /\.js(x)?$/,
            loader: 'babel-istanbul',
            include: [
                path.join(__dirname,'/app'),
            ],
            query: {
                cacheDirectory: true,
            },
        },
    ];

    karamConfig.plugins.push(require('istanbul-instrumenter-loader'));
    karamConfig.plugins.push(require('karma-coverage'));
    karamConfig.plugins.push(require('karma-spec-reporter'));
    karamConfig.logLevel = config.LOG_INFO,

    config.set(karamConfig);
}
