import { ISchema } from './interface';
export default class CommandSchemaBuilder {
  constructor(private schema: ISchema = { positional: {}, options: {} }) {}
  addPositional(
    name: string,
    config: {
      describe: string;
      type: string;
      demandOption?: boolean;
      alias?: string;
    },
  ) {
    this.schema.positional[name] = config;
    return this;
  }

  addOption(
    name: string,
    config: { alias?: string; describe: string; type: string },
  ) {
    this.schema.options[name] = config;
    return this;
  }

  build() {
    return this.schema;
  }
}
