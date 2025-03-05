export interface IConfig {
  settings: ISettings;
  categories: ICategory[];
  templates: {
    [key: string]: {
      extensions?: string[];
      files: IFile[];
    };
  };
}

export interface ICategory {
  name: string;
  path: string;
}

export interface ISettings {
  rootDirectory: string;
}

export interface IFile {
  name: string;
  condition?: string;
  content: string;
}

export interface IPrompt {
  templateName: string;
  componentName: string;
  category: string;
  subcategory?: string;
  extensions?: string;
}
