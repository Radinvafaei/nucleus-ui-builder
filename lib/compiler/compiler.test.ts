import Compiler from './compiler';

describe(`Compiler`, () => {
  let compiler: Compiler;

  beforeEach(() => {
    compiler = new Compiler();
  });

  it(`should replace placeholders correctly`, () => {
    const template = `Hello, {{name}}! Welcome to {{category}}.`;
    const replacements = { name: `John`, category: `React` };

    const result = compiler.compile(template, replacements);
    expect(result).toBe(`Hello, John! Welcome to React.`);
  });

  it(`should throw an error for missing replacements`, () => {
    const template = `Hello, {{name}}!`;
    const replacements = {};

    expect(() => compiler.compile(template, replacements)).toThrow(
      `Missing replacement for: name`,
    );
  });

  it(`should track bracket states correctly and throw an error for unmatched brackets`, () => {
    const template = `This is [a {test (with unmatched brackets].`;
    const replacements = {};

    expect(() => compiler.compile(template, replacements)).toThrow(
      /Unmatched (opening|closing) bracket/,
    );
  });

  it(`should allow nested brackets if correctly matched`, () => {
    const template = `Valid [{nested (brackets)}] example.`;
    const replacements = {};

    const result = compiler.compile(template, replacements);
    expect(result).toBe(`Valid [{nested (brackets)}] example.`);
  });

  it(`should handle multiple placeholders correctly`, () => {
    const template = `{{greeting}}, {{name}}!`;
    const replacements = { greeting: `Hello`, name: `Alice` };

    const result = compiler.compile(template, replacements);
    expect(result).toBe(`Hello, Alice!`);
  });
});
