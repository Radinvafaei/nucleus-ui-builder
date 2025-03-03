import * as fs from 'fs';
import * as yaml from 'js-yaml';
import BootstrapConfig from './bootstrap.config';

jest.mock(`fs`);
jest.mock(`js-yaml`);

describe(`Bootstrap: BootstrapConfig`, () => {
  const mockWriteFileSync = fs.writeFileSync as jest.Mock;
  const mockExistsSync = fs.existsSync as jest.Mock;
  const mockYamlDump = yaml.dump as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should create .nucleus.yml if it does not exist`, () => {
    mockExistsSync.mockReturnValue(false);
    mockYamlDump.mockReturnValue(`mocked_yaml_content`);

    BootstrapConfig.run(`.nucleus.yml`);

    expect(mockWriteFileSync).toHaveBeenCalledWith(
      `.nucleus.yml`,
      `mocked_yaml_content`,
      `utf8`,
    );
  });

  it(`should not overwrite existing .nucleus.yml`, () => {
    mockExistsSync.mockReturnValue(true);

    BootstrapConfig.run(`.nucleus.yml`);

    expect(mockWriteFileSync).not.toHaveBeenCalled();
  });
  it(`should log message when file already exists`, () => {
    mockExistsSync.mockReturnValue(true);
    const consoleSpy = jest.spyOn(console, `log`).mockImplementation();

    BootstrapConfig.run(`.nucleus.yml`);

    expect(consoleSpy).toHaveBeenCalledWith(
      `✅ Configuration file ".nucleus.yml" already exists.`,
    );

    consoleSpy.mockRestore();
  });

  it(`should log message when creating new configuration`, () => {
    mockExistsSync.mockReturnValue(false);
    const consoleSpy = jest.spyOn(console, `log`).mockImplementation();

    BootstrapConfig.run(`.nucleus.yml`);

    expect(consoleSpy).toHaveBeenCalledWith(
      `🚀 Created default configuration at ".nucleus.yml"`,
    );

    consoleSpy.mockRestore();
  });
});
