
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.app.json'
    }]
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    // Add any module name mappings if needed
    // For example, to handle CSS imports in tests:
    // "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
};

export default config;
