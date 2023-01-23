module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
    "^webgazer$": "<rootDir>/tests/helperFiles/jestWebgazerFix.js"
  },
}
