/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  testMatch: [
    "**/?(*.)+(spec).ts"
],
collectCoverageFrom: [
    "src/**/*.ts"
],
modulePathIgnorePatterns: [
    // "src/index.ts"
],
collectCoverage: true,
  globals: {
    "ts-jest": {
      // ts-jest configuration goes here
    }
  }
};