import { CommandModule, Arguments, Argv } from 'yargs';
import CommandSchemaBuilder from '@commands/builder/command.schema.builder';
import CommandProcessor from '@commands/processor/command.processor';
import { IPrompt } from '@interfaces/config.interface';

export default class CommandScaffold implements CommandModule {
  command = `scaffold <templateName> in <category> [subcategory] [extensions]`;
  describe = `Scaffold a new component using a predefined template`;
  private schema: CommandSchemaBuilder;

  constructor(private readonly processor: CommandProcessor) {
    this.schema = new CommandSchemaBuilder()
      .addPositional(`templateName`, {
        alias: `t`,
        describe: `Template name (e.g., component, hook, page)`,
        type: `string`,
        demandOption: true,
      })
      .addPositional(`category`, {
        alias: `c`,
        describe: `Category where the component will be placed`,
        type: `string`,
      })
      .addPositional(`subcategory`, {
        alias: `s`,
        describe: `Optional subdirectory inside the category`,
        type: `string`,
      })
      .addOption(`extensions`, {
        alias: `e`,
        describe: `Comma-separated list of extensions (e.g., jest,storybook)`,
        type: `string`,
      });
  }

  builder(cli: Argv) {
    const schema = this.schema.build();
    Object.entries(schema.positional).forEach(([name, config]) => {
      cli.positional(name, config);
    });
    Object.entries(schema.options).forEach(([name, config]) => {
      cli.option(name, config);
    });
    return cli;
  }

  handler(argv: Arguments) {
    this.processor.execute(argv as Arguments<IPrompt>);
  }
}
