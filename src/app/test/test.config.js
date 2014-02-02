// Karma Test Runner configuration

module.exports = function(config) {
    config.set({
        basePath: '../../../target/test',
        frameworks: ['jasmine', 'requirejs'],
        // We run our tests against the built code, as it would be
        // in production - for now just the Rich client
        files: ['tests.js'],
        exclude: [],
        reporters: ['progress'],
        port: 9871,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: false,
        browsers: ['PhantomJS'],
        captureTimeout: 60000
    });
};
