module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '\\.(gql|graphql)$': 'jest-transform-graphql',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '\\.(|css|sass|scss|svg)$': '<rootDir>/src/test/__mocks__/file-mock.ts',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@graphql(.*)$': '<rootDir>/src/graphql$1',
    '^@queries(.*)$': '<rootDir>/src/graphql/queries$1',
    '^@mutations(.*)$': '<rootDir>/src/graphql/mutations$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@routes(.*)$': '<rootDir>/src/routes$1',
    '@svg(.*)$': '<rootDir>/src/svg$1',
  },
  snapshotSerializers: ['jest-emotion'],
};
