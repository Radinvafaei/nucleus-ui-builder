import * as path from 'path';

export default class PathResolver {
  static resolve(
    rootDir: string,
    category: string,
    componentName: string,
    fileName: string,
    subcategory?: string,
  ): string {
    return path
      .join(rootDir, category, subcategory || ``, componentName, fileName)
      .normalize();
  }
}
