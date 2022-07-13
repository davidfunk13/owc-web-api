/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  testEnvironment: 'node',
  testMatch: [
    "**/?(*.)+(spec).ts"
  ],
  collectCoverageFrom: [
    "src/**/*.ts"
  ],
  coveragePathIgnorePatterns: [
    "src/types",
    "src/entity",
    "src/validation",
    "src/routes",
    "src/datasource.ts",
    "src/index.ts",
    "src/redis.ts",
    "src/testFunction.ts",
  ],
  testPathIgnorePatterns: [
    "src/types",
    "src/entity",
    "src/validation",
    "src/routes",
    "src/datasource.ts",
    "src/index.ts",
    "src/redis.ts",
    "src/testFunction.ts",
  ],
};