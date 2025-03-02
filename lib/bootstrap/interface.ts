export interface IConfig {
  settings: ISettings;
  templates: {
    [key: string]: {
      extensions?: string[];
      files: IFile[];
    };
  };
}

export interface ISettings {
  rootDirectory: string;
}

export interface IFile {
  name: string;
  condition?: string;
  content: string;
}
