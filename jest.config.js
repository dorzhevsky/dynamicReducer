// eslint-disable-next-line import/no-extraneous-dependencies
const { defaults } = require("jest-config");

module.exports = {
  collectCoverage: false,
  moduleDirectories: [...defaults.moduleDirectories, "<rootDir>/src/"],
  testRegex: "(/__tests__/.*|(\\.|/)spec)\\.jsx?$",
  setupFilesAfterEnv: []
};
