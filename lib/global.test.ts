import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const COMPONENT_PATH = path.join(
  process.cwd(),
  `output`,
  `Atom`,
  `Inputs`,
  `Input`,
);

const OUTPUT_DIR = path.resolve(__dirname, `../output`); // Adjust the path

beforeAll(() => {
  try {
    if (fs.existsSync(OUTPUT_DIR)) {
      fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    }
    const result = execSync(
      `node dist/cjs/lib/index.js scaffold component Input in Atom Inputs storybook`,
      { encoding: `utf-8`, stdio: `inherit` },
    );
  } catch (error) {
    console.error(`CLI Execution Error:`, error);
  }
});

describe(`Nucleus CLI: Component Creation`, () => {
  it(`should create the component directory`, async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(fs.existsSync(COMPONENT_PATH)).toBe(true);
  });

  it(`should create Input.tsx`, () => {
    expect(fs.existsSync(path.join(COMPONENT_PATH, `Input.tsx`))).toBe(true);
  });

  it(`should create interface.ts`, () => {
    expect(fs.existsSync(path.join(COMPONENT_PATH, `interface.ts`))).toBe(true);
  });

  it(`should create index.ts`, () => {
    expect(fs.existsSync(path.join(COMPONENT_PATH, `index.ts`))).toBe(true);
  });

  it(`should create Button.storybook.tsx`, () => {
    expect(
      fs.existsSync(path.join(COMPONENT_PATH, `Input.storybook.tsx`)),
    ).toBe(true);
  });
});
