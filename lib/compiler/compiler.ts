export default class Compiler {
  private readonly bracketStack: string[] = [];
  private readonly placeholderRegex = /\{\{(.*?)}}/g;
  public compile(
    template: string,
    replacements: Record<string, string>,
  ): string {
    let compiled = ``;

    for (let i = 0; i < template.length; i++) {
      const char = template[i];

      if (this.isOpeningBracket(char)) {
        this.bracketStack.push(char);
      } else if (this.isClosingBracket(char)) {
        if (!this.matchesLastOpened(char)) {
          throw new Error(`Unmatched closing bracket: ${char}`);
        }
        this.bracketStack.pop();
      }

      compiled += char;
    }

    if (this.bracketStack.length > 0) {
      throw new Error(`Unmatched opening bracket(s) detected`);
    }

    return compiled.replace(this.placeholderRegex, (_, key) => {
      if (!(key in replacements)) {
        throw new Error(`Missing replacement for: ${key}`);
      }
      return replacements[key];
    });
  }

  private isOpeningBracket(char: string): boolean {
    return [`[`, `{`, `(`].includes(char);
  }

  private isClosingBracket(char: string): boolean {
    return [`]`, `}`, `)`].includes(char);
  }

  private matchesLastOpened(char: string): boolean {
    const lastOpened = this.bracketStack[this.bracketStack.length - 1];
    return (
      (char === `]` && lastOpened === `[`) ||
      (char === `}` && lastOpened === `{`) ||
      (char === `)` && lastOpened === `(`)
    );
  }
}
