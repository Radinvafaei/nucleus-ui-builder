import { Arguments } from 'yargs';
import CommandProcessor from './command.processor';
import TemplateLoader from '@loader/template.loader';
import { IPrompt } from '@interfaces/config.interface';

describe(`CommandProcessor`, () => {
  let commandProcessor: CommandProcessor;

  beforeEach(() => {
    jest.resetAllMocks();
    commandProcessor = new CommandProcessor(TemplateLoader.getInstance());
  });

  it(`should throw error if componentName is missing `, () => {
    const argv: Arguments<IPrompt> = {
      templateName: `component`,
      category: `Atom`,
      subcategory: `buttons`,
      extensions: `jest,storybook`,
    } as Arguments<IPrompt>;
    expect(() => commandProcessor.execute(argv)).toThrow(
      `Missing required argument: componentName`,
    );
  });

  it(`should execute with valid arguments`, () => {
    const argv: Arguments<IPrompt> = {
      templateName: `component`,
      category: `Atom`,
      componentName: `Button`,
      subcategory: `buttons`,
      extensions: `jest,storybook`,
    } as Arguments<IPrompt>;

    expect(() => commandProcessor.execute(argv)).not.toThrow();
  });

  it(`should throw an error if templateName is missing`, () => {
    const argv = {
      category: `Atom`,
      componentName: `Button`,
    } as Arguments<IPrompt>;

    expect(() => commandProcessor.execute(argv)).toThrow(
      `Missing required argument: templateName`,
    );
  });

  it(`should throw an error if category is missing`, () => {
    const argv = {
      templateName: `component`,
      componentName: `Button`,
    } as Arguments<IPrompt>;

    expect(() => commandProcessor.execute(argv)).toThrow(
      `Missing required argument: category`,
    );
  });

  it(`should throw an error if templateName does not exist in config`, () => {
    const argv = {
      templateName: `unknownComponent`,
      componentName: `Button`,
      category: `Atom`,
    } as Arguments<IPrompt>;

    expect(() => commandProcessor.execute(argv)).toThrow(
      `Invalid template: unknownComponent does not exist in the configuration.`,
    );
  });

  it(`should throw an error if category does not exist in config`, () => {
    const argv = {
      templateName: `component`,
      componentName: `Button`,
      category: `nonexistentCategory`,
    } as Arguments<IPrompt>;

    expect(() => commandProcessor.execute(argv)).toThrow(
      `Invalid category: nonexistentCategory does not exist in the configuration.`,
    );
  });

  it(`should throw an error if an invalid extension is provided`, () => {
    const argv = {
      componentName: `Button`,
      templateName: `component`,
      category: `Atom`,
      extensions: `invalidExtension`,
    } as Arguments<IPrompt>;

    expect(() => commandProcessor.execute(argv)).toThrow(
      `Invalid extension: invalidExtension is not allowed for this template.`,
    );
  });

  it(`should allow valid extensions`, () => {
    const argv = {
      componentName: `Button`,
      category: `Atom`,
      templateName: `component`,
      extensions: `storybook`,
    } as Arguments<IPrompt>;

    expect(() => commandProcessor.execute(argv)).not.toThrow();
  });
  it(`should throw an error if config is missing`, () => {
    jest.spyOn(TemplateLoader.prototype, `config`, `get`).mockReturnValue(null);

    const argv = {
      templateName: `component`,
      componentName: `Button`,
      category: `Atom`,
    } as Arguments<IPrompt>;

    expect(() => commandProcessor.execute(argv)).toThrow(`config is missing`);
  });
});
