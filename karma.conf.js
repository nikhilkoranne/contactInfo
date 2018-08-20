module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],
    files: [
      './src/**/*.spec.js'
    ],
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],
    preprocessors: {},
    coverageReporter: {
      type: 'html',
      dir: 'coverage'
    },
    logLevel: config.LOG_INFO,
    singleRun: false
  });
};