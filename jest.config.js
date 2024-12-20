globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: 'tsconfig.spec.json', // this is the project root tsconfig
};

/**
 * @type { import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Only transform .ts files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!flat)/', // Exclude modules except 'flat' from transformation
  ],
  moduleDirectories: ['node_modules', 'src'],
  fakeTimers: {
    enableGlobally: true,
  },
  modulePathIgnorePatterns: [
    "<rootDir>/dist/" // Ignora la carpeta dist
  ],
  testPathIgnorePatterns: [
    "<rootDir>/dist/" // Ignora las pruebas en dist
  ],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
};

// const { pathsToModuleNameMapper } = require("ts-jest");
// const { compilerOptions } = require("./tsconfig");

// module.exports = {
//   preset: "jest-preset-angular",
//   roots: ["<rootDir>/src/"],
//   testMatch: ["**/+(*.)+(spec).+(ts)"],
//   setupFilesAfterEnv: ["<rootDir>/src/test.ts"],
//   collectCoverage: true,
//   coverageDirectory: 'test_output',
//   coverageReporters: ["json", "html","text-summary", "clover"],
//   coverageDirectory: "coverage",
//   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
//     prefix: "<rootDir>/",
//   }),
//   reporters: [
//     "default",
//     [
//       "jest-junit",
//       {
//         outputDirectory: "test-results",
//         outputName: "unit-test-results.xml"
//       }
//     ]
//   ]
// };
