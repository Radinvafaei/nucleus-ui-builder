import TemplateLoader from '@loader/template.loader';
import { ICategory, IConfig, IPrompt } from '@interfaces/config.interface';
import { Arguments } from 'yargs';
import Compiler from '@compiler/compiler';
import FileWriter from '@commands/writer/file.writer';
import PathResolver from '@resolvers/path.resolver';
import WriteFileCommand from '@commands/writer/write.file.command';

export default class CommandProcessor {
  constructor(
    private readonly loader: TemplateLoader,
    private readonly compiler: Compiler = new Compiler(),
    private readonly fileWriter: FileWriter = new FileWriter(),
    private readonly resolver = PathResolver.resolve,
  ) {}

  public execute(argv: Arguments<IPrompt>): void {
    const config = this.loader.config;
    if (!config) {
      throw new Error(`config is missing`);
    }

    this.validateArgs(argv, config);
    const template = config.templates[argv.templateName];
    const category = config.categories.find(
      (c) => c.name === argv.category,
    ) as ICategory;

    const replacements = {
      category: argv.category,
      componentName: argv.componentName,
      subcategory: argv.subcategory || ``,
      extensions: argv.extensions || ``,
    };

    const filteredFiles = template.files.filter(
      (file) => !(file.condition && !argv.extensions),
    );

    filteredFiles.forEach((file) => {
      const resolvedPath = this.resolver(
        config.settings.rootDirectory,
        category.path,
        argv.componentName,
        file.name.replace(
          /\{\{(.*?)}}/g,
          (_, key: keyof typeof replacements) => replacements[key] || key,
        ),
        argv.subcategory,
      );

      const compiledContent = this.compiler.compile(file.content, replacements);
      this.fileWriter.addCommand(
        new WriteFileCommand(resolvedPath, compiledContent),
      );
    });

    this.fileWriter.executeAll();
  }

  private validateArgs(argv: Arguments<IPrompt>, config: IConfig): void {
    if (!argv.componentName) {
      throw new Error(`Missing required argument: componentName`);
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
    if (argv.extensions) {
      const validExtensions =
        config.templates[argv.templateName].extensions || [];
      const providedExtensions = argv.extensions.split(`,`);
      providedExtensions.forEach((ext) => {
        if (!validExtensions.includes(ext.trim())) {
          throw new Error(
            `Invalid extension: ${ext} is not allowed for this template.`,
          );
        }
      });
    }
  }
}
