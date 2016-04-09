module.exports = function (wallaby) {
  // There is a weird error with the mui and mantra.
  // See: https://goo.gl/cLH8ib
  // Using require here seems to be the error.
  // Renaming it into `load` just fixed the issue.
  var load = require;

  return {
    files: [
      'src/**/*.js'
    ],
    tests: [
      'tests/**/*.js',
    ],
    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },
    env: {
      type: 'node',
    },
    debug: true,
    testFramework: 'mocha',
    setup: () => {
    },
  };
};
