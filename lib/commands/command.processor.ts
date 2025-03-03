import TemplateLoader from '@loader/template.loader';
import { IPrompt } from '@interfaces/config.interface';
import { Arguments } from 'yargs';

export default class CommandProcessor {
  constructor(private readonly loader: TemplateLoader) {}

  public execute(argv: Arguments<IPrompt>): void {
    const config = this.loader.config;
    if (!config) {
      throw new Error(`config is missing`);
    }
    if (!argv.templateName) {
      throw new Error(`Missing required argument: templateName`);
    }
    if (!config.templates[argv.templateName]) {
      throw new Error(
        `Invalid template: ${argv.templateName} does not exist in the configuration.`,
      );
    }
    if (!argv.category) {
      throw new Error(`Missing required argument: category`);
    }
    if (!config.categories.some((c) => c.name === argv.category)) {
      throw new Error(
        `Invalid category: ${argv.category} does not exist in the configuration.`,
      );
    }
  }
}
