module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__testes__/**/*.teste.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/servidor.ts',
    '!src/configuracao/banco-dados.ts',
    '!src/tipos/**'
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
    }
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};
