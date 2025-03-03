import { IFileCommand } from './interface';

export default class FileWriter {
  private commands: IFileCommand[] = [];

  addCommand(command: IFileCommand): void {
    this.commands.push(command);
  }

  executeAll(): void {
    this.commands.forEach((command) => command.execute());
    this.commands = []; // Clear the queue after execution
  }
}
