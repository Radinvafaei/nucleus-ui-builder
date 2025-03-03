import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { IConfig } from '@interfaces/config.interface';

export default class TemplateLoader {
  private static instance: TemplateLoader;
  private readonly configPath: string;
  private _config: IConfig | null = null;
  private readonly loader = yaml;

  private constructor() {
    this.configPath = path.resolve(process.cwd(), `.nucleus.yml`);
    this.loadConfig();
  }

  public static getInstance(): TemplateLoader {
    if (!TemplateLoader.instance) {
      TemplateLoader.instance = new TemplateLoader();
    }
    return TemplateLoader.instance;
  }

  private loadConfig(): void {
    try {
      const fileContents = fs.readFileSync(this.configPath, `utf8`);
      this._config = this.loader.load(fileContents) as unknown as IConfig;
    } catch (error) {
      console.error(`Caught error:`, { error });
      throw new Error(`File not found: .nucleus.yml`);
    }
  }

  get config(): IConfig | null {
    return this._config;
  }
}
