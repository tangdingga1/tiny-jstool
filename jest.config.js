// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,

  coverageDirectory: '<rootDir>/coverage',

  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   'node_modules'
  // ],

  // An array of file extensions your modules use
  moduleFileExtensions: [ 'js' ],

  // The root directory that Jest should scan for tests and modules within
  // rootDir: './test/',

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   '<rootDir>'
  // ],

  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.js'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    '/node_modules/',
  ],

  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    '/node_modules/',
  ],
};
