import fs from 'fs';
import yaml from 'js-yaml';
import TemplateLoader from './template.loader';

jest.mock(`fs`);
jest.mock(`js-yaml`);

describe(`Loader: TemplateLoader`, () => {
  const mockYamlData = {
    settings: { rootDirectory: `src/components` },
    templates: { component: { files: [] } },
  };

  beforeEach(() => {
    jest.resetAllMocks();
    (TemplateLoader as any).instance = undefined;
  });

  it(`should load and parse YAML configuration`, () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(`mocked-yaml-content`);
    (yaml.load as jest.Mock).mockReturnValue(mockYamlData);

    const loader = TemplateLoader.getInstance();
    expect(loader.config).toEqual(mockYamlData);
  });

  it(`should throw an error if YAML file is missing`, () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error(`ENOENT: no such file or directory, open '.nucleus.yml'`);
    });
    expect(() => TemplateLoader.getInstance()).toThrow(/File not found/);
  });

  it(`should return the same instance on multiple calls`, () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(`mocked-yaml-content`);
    (yaml.load as jest.Mock).mockReturnValue(mockYamlData);

    const instance1 = TemplateLoader.getInstance();
    const instance2 = TemplateLoader.getInstance();
    expect(instance1).toBe(instance2);
  });
});
