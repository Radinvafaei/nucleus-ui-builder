import * as fs from 'fs';
import * as path from 'path';
import WriteFileCommand from './write.file.command';

jest.mock(`fs`);

describe(`File: write file command`, () => {
  const filePath = `test_dir/test_file.txt`;
  const fileContent = `Hello, World!`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should create directories and write file content`, () => {
    const mkdirSyncMock = jest.spyOn(fs, `mkdirSync`);
    const writeFileSyncMock = jest.spyOn(fs, `writeFileSync`);

    const command = new WriteFileCommand(filePath, fileContent);
    command.execute();

    expect(mkdirSyncMock).toHaveBeenCalledWith(path.dirname(filePath), {
      recursive: true,
    });
    expect(writeFileSyncMock).toHaveBeenCalledWith(
      filePath,
      fileContent,
      `utf8`,
    );
  });
});
