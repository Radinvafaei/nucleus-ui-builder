import PathResolver from './path.resolver';
import * as path from 'path';
import { IPrompt } from '@interfaces/config.interface';

describe(`PathResolver`, () => {
  const rootDir = `/src`;
  const args: IPrompt = {
    templateName: `component`,
    componentName: `Button`,
    category: `UI`,
  };

  it(`should generate the correct path with category and subcategory`, () => {
    const subcategory = `buttons`;
    const resolvedPath = PathResolver.resolve(
      rootDir,
      args.category,
      args.componentName,
      `Button.tsx`, // Adding file name
      subcategory,
    );

    expect(resolvedPath).toBe(
      path.normalize(`/src/UI/buttons/Button/Button.tsx`),
    );
  });

  it(`should generate the correct path without subcategory`, () => {
    const resolvedPath = PathResolver.resolve(
      rootDir,
      args.category,
      args.componentName,
      `Button.tsx`,
    );

    expect(resolvedPath).toBe(path.normalize(`/src/UI/Button/Button.tsx`));
  });

  it(`should prevent double slashes when subcategory is missing`, () => {
    const resolvedPath = PathResolver.resolve(
      rootDir,
      args.category,
      args.componentName,
      `Button.tsx`,
      undefined,
    );

    expect(resolvedPath).not.toContain(`//`);
  });

  it(`should normalize paths to ensure cross-platform compatibility`, () => {
    const subcategory = `buttons`;
    const resolvedPath = PathResolver.resolve(
      rootDir,
      args.category,
      args.componentName,
      `Button.tsx`,
      subcategory,
    );

    expect(resolvedPath).toBe(path.normalize(resolvedPath));
  });

  it(`should generate correct paths for interface.ts`, () => {
    const resolvedPath = PathResolver.resolve(
      rootDir,
      args.category,
      args.componentName,
      `interface.ts`,
    );

    expect(resolvedPath).toBe(path.normalize(`/src/UI/Button/interface.ts`));
  });

  it(`should generate correct paths for index.ts`, () => {
    const resolvedPath = PathResolver.resolve(
      rootDir,
      args.category,
      args.componentName,
      `index.ts`,
    );

    expect(resolvedPath).toBe(path.normalize(`/src/UI/Button/index.ts`));
  });

  it(`should generate correct paths for storybook file`, () => {
    const resolvedPath = PathResolver.resolve(
      rootDir,
      args.category,
      args.componentName,
      `Button.storybook.tsx`,
    );

    expect(resolvedPath).toBe(
      path.normalize(`/src/UI/Button/Button.storybook.tsx`),
    );
  });
});
