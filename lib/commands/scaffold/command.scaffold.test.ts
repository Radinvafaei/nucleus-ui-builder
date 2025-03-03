import CommandProcessor from '@commands/processor/command.processor';
import CommandSchemaBuilder from '@commands/builder/command.schema.builder';
import { Arguments, Argv } from 'yargs';
import { IPrompt } from '@interfaces/config.interface';
import CommandScaffold from './command.scaffold';
import TemplateLoader from '@loader/template.loader';

jest.mock(`@commands/processor/command.processor`);

describe(`CommandScaffold`, () => {
  let commandScaffold: CommandScaffold;
  let mockProcessor: jest.Mocked<CommandProcessor>;
  let mockCli: jest.Mocked<Argv>;

  beforeEach(() => {
    mockProcessor = new CommandProcessor(
      TemplateLoader.getInstance(),
    ) as jest.Mocked<CommandProcessor>;
    commandScaffold = new CommandScaffold(mockProcessor);
    mockCli = {
      positional: jest.fn().mockReturnThis(),
      option: jest.fn().mockReturnThis(),
    } as unknown as jest.Mocked<Argv>;
  });

  it(`should define the correct command structure`, () => {
    expect(commandScaffold.command).toBe(
      `scaffold <templateName> in <category> [subcategory] [extensions]`,
    );
    expect(commandScaffold.describe).toBe(
      `Scaffold a new component using a predefined template`,
    );
  });

  it(`should configure the Yargs builder correctly`, () => {
    commandScaffold.builder(mockCli);
    expect(mockCli.positional).toHaveBeenCalledTimes(3);
    expect(mockCli.option).toHaveBeenCalledTimes(1);
  });

  it(`should execute the handler with the correct arguments`, () => {
    const mockArgs: Arguments<IPrompt> = {
      templateName: `component`,
      category: `Atom`,
      subcategory: `buttons`,
      extensions: `jest,storybook`,
    } as Arguments<IPrompt>;

    commandScaffold.handler(mockArgs);
    expect(mockProcessor.execute).toHaveBeenCalledWith(mockArgs);
  });
});
