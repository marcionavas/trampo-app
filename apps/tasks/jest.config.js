module.exports = {
  ...require('../../jest.config.js'),
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@common$': '<rootDir>/../../libs/common/src/index.ts',
    '^@common/(.*)$': '<rootDir>/../../libs/common/src/$1',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/**/*.module.ts',
  ],
};
