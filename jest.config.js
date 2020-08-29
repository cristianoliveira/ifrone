module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  rootDir: 'lib',
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules', 'lib'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleNameMapper: {},
  resolver: null,
  globals: {
    __DEV__: false
  }
};
