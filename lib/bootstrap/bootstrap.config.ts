import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { IConfig } from '@interfaces/config.interface';

export default class BootstrapConfig {
  private static defaultConfig: IConfig = {
    settings: {
      rootDirectory: `./src`,
    },
    categories: [{ name: `Atom`, path: `/atom` }],
    templates: {
      component: {
        extensions: [],
        files: [
          {
            name: `{{componentName}}.tsx`,
            content: `
              import React from 'react';
              import { I{{componentName}}Props } from './interface';

              const {{componentName}}: React.FC<I{{componentName}}Props> = ({}) => {
                return <div>{{componentName}}</div>;
              };

              export default {{componentName}};
            `,
          },
          {
            name: `interface.ts`,
            content: `export interface I{{componentName}}Props {};`,
          },
          {
            name: `index.ts`,
            content: `
              export { default } from './{{componentName}}';
              export * from './interface';
            `,
          },
        ],
      },
    },
  };
  static run(filePath: string = `.nucleus.yml`) {
    if (fs.existsSync(filePath)) {
      console.log(`✅ Configuration file "${filePath}" already exists.`);
      return;
    }

    const yamlContent = yaml.dump(this.defaultConfig);
    fs.writeFileSync(filePath, yamlContent, `utf8`);
    console.log(`🚀 Created default configuration at "${filePath}"`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  BootstrapConfig.run();
}
