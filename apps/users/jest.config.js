module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@common$': '<rootDir>/../../libs/common/src/index.ts',
    '^@common/(.*)$': '<rootDir>/../../libs/common/src/$1'
  }
};