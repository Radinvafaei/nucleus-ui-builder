import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import CommandProcessor from '@commands/processor/command.processor';
import CommandScaffold from '@commands/scaffold/command.scaffold';
import TemplateLoader from '@loader/template.loader';

export default class CLI {
  private readonly processor: CommandProcessor;
  private readonly scaffoldCommand: CommandScaffold;

  constructor() {
    this.processor = new CommandProcessor(TemplateLoader.getInstance());
    this.scaffoldCommand = new CommandScaffold(this.processor);
  }

  public run(): void {
    yargs(hideBin(process.argv))
      .command(this.scaffoldCommand)
      .demandCommand(2, `You need at least two commands before moving on`)
      .help()
      .parse();
  }
}
