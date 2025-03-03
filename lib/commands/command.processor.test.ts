import CommandProcessor from '@commands/command.processor';
import { IPrompt } from '@interfaces/config.interface';
import TemplateLoader from '@loader/template.loader';
import { Arguments } from 'yargs';
describe(`CommandProcessor`, () => {
  let commandProcessor: CommandProcessor;

  beforeEach(() => {
    jest.resetAllMocks();
    commandProcessor = new CommandProcessor(TemplateLoader.getInstance());
  });

  it(`should execute with valid arguments`, () => {
    const argv: Arguments<IPrompt> = {
      templateName: `component`,
      category: `Atom`,
      subcategory: `buttons`,
      extensions: `jest,storybook`,
    } as Arguments<IPrompt>;

    expect(() => commandProcessor.execute(argv)).not.toThrow();
  });
  it(`should throw an error if templateName is missing`, () => {
    const argv = {
      category: `Atom`,
    } as Arguments<IPrompt>;

    expect(() => commandProcessor.execute(argv)).toThrow(
      `Missing required argument: templateName`,
    );
  });
  it(`should throw an error if category is missing`, () => {
    const argv = {
      templateName: `component`,
    } as Arguments<IPrompt>;

    expect(() => commandProcessor.execute(argv)).toThrow(
      `Missing required argument: category`,
    );
  });

  it(`should throw an error if templateName does not exist in config`, () => {
    const argv = {
      templateName: `unknownComponent`,
      category: `Atom`,
    } as Arguments<IPrompt>;

    expect(() => commandProcessor.execute(argv)).toThrow(
      `Invalid template: unknownComponent does not exist in the configuration.`,
    );
  });

  it(`should throw an error if category does not exist in config`, () => {
    const argv = {
      templateName: `component`,
      category: `nonexistentCategory`,
    } as Arguments<IPrompt>;

    expect(() => commandProcessor.execute(argv)).toThrow(
      `Invalid category: nonexistentCategory does not exist in the configuration.`,
    );
  });
});
