import WriteFileCommand from './write.file.command';
import FileWriter from './file.writer';

describe(`File: file writer`, () => {
  let fileWriter: FileWriter;
  let mockCommand: WriteFileCommand;

  beforeEach(() => {
    fileWriter = new FileWriter();
    mockCommand = new WriteFileCommand(`test_path`, `test_content`);
    jest.spyOn(mockCommand, `execute`);
  });

  it(`should add commands to the queue`, () => {
    fileWriter.addCommand(mockCommand);
    expect((fileWriter as any).commands).toContain(mockCommand);
  });

  it(`should execute all commands and clear the queue`, () => {
    fileWriter.addCommand(mockCommand);
    fileWriter.executeAll();

    expect(mockCommand.execute).toHaveBeenCalled();
    expect((fileWriter as any).commands.length).toBe(0);
  });
});
