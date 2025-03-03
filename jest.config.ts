/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: `coverage`,
  coverageProvider: `v8`,
  notify: true,
  transform: {
    '^.+\\.ts?$': [
      `ts-jest`,
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: `node_modules/ts-jest-mock-import-meta`,
              options: {
                metaObjectReplacement: { url: `https://www.url.com` },
              },
            },
          ],
        },
      },
    ],
  },
  testEnvironment: `node`,
  preset: `ts-jest`,
  extensionsToTreatAsEsm: [`.ts`],
  testPathIgnorePatterns: [`/node_modules/`, `/dist/`],
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@bootstrap/*': [`bootstrap/*`],
      '@builders/*': [`builders/*`],
      '@interfaces/*': [`interfaces/*`],
      '@commands/*': [`commands/*`],
      '@loader/*': [`loader/*`],
    },
    {
      prefix: `<rootDir>/lib/`,
    },
  ),
  rootDir: `.`,
};

export default config;
