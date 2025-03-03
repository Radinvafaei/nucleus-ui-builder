import CLI from './cli';
import yargs from 'yargs';

jest.mock(`yargs`, () => {
  const mockYargsInstance = {
    command: jest.fn().mockReturnThis(),
    demandCommand: jest.fn().mockReturnThis(),
    help: jest.fn().mockReturnThis(),
    parse: jest.fn().mockReturnThis(),
  };
  return jest.fn(() => mockYargsInstance);
});

jest.mock(`@commands/scaffold/command.scaffold`);
jest.mock(`@commands/processor/command.processor`);

describe(`CLI: core`, () => {
  let cli: CLI;

  beforeEach(() => {
    jest.clearAllMocks();
    cli = new CLI();
  });

  it(`should initialize and attach commands to yargs`, () => {
    const mockYargs = yargs();

    cli.run();

    expect(mockYargs.command).toHaveBeenCalledWith(expect.anything());
    expect(mockYargs.demandCommand).toHaveBeenCalledWith(
      2,
      `You need at least two commands before moving on`,
    );
    expect(mockYargs.help).toHaveBeenCalled();
    expect(mockYargs.parse).toHaveBeenCalled();
  });
});
