import { IFileCommand } from './interface';
import * as fs from 'fs';
import * as path from 'path';

export default class WriteFileCommand implements IFileCommand {
  constructor(
    private filePath: string,
    private content: string,
  ) {}

  execute(): void {
    const directory = path.dirname(this.filePath);

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(this.filePath, this.content, `utf8`);
  }
}
