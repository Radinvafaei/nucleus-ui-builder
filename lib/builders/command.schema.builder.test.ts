import CommandSchemaBuilder from './command.schema.builder';

describe(`CLI: CommandSchemaBuilder`, () => {
  let builder: CommandSchemaBuilder;

  beforeEach(() => {
    builder = new CommandSchemaBuilder();
  });

  it(`should allow adding a positional argument`, () => {
    builder.addPositional(`templateName`, {
      describe: `Template name`,
      type: `string`,
      demandOption: true,
    });

    const schema = builder.build();
    expect(schema.positional).toHaveProperty(`templateName`);
    expect(schema.positional.templateName.describe).toBe(`Template name`);
    expect(schema.positional.templateName.type).toBe(`string`);
    expect(schema.positional.templateName.demandOption).toBe(true);
  });

  it(`should allow adding an option`, () => {
    builder.addOption(`extensions`, {
      alias: `e`,
      describe: `Extensions to use`,
      type: `string`,
    });

    const schema = builder.build();
    expect(schema.options).toHaveProperty(`extensions`);
    expect(schema.options.extensions.alias).toBe(`e`);
    expect(schema.options.extensions.describe).toBe(`Extensions to use`);
    expect(schema.options.extensions.type).toBe(`string`);
  });

  it(`should support method chaining`, () => {
    builder
      .addPositional(`templateName`, {
        describe: `Template name`,
        type: `string`,
      })
      .addOption(`extensions`, {
        alias: `e`,
        describe: `Extensions`,
        type: `string`,
      });

    const schema = builder.build();
    expect(schema.positional).toHaveProperty(`templateName`);
    expect(schema.options).toHaveProperty(`extensions`);
  });

  it(`should build a schema object for Yargs`, () => {
    builder
      .addPositional(`templateName`, {
        describe: `Template name`,
        type: `string`,
      })
      .addOption(`extensions`, {
        alias: `e`,
        describe: `Extensions`,
        type: `string`,
      });

    const schema = builder.build();
    expect(schema).toHaveProperty(`positional`);
    expect(schema).toHaveProperty(`options`);
    expect(schema.positional.templateName.describe).toBe(`Template name`);
    expect(schema.options.extensions.alias).toBe(`e`);
  });
});
