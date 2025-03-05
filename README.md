# React Nucleus

**React Nucleus** is a powerful CLI tool designed to scaffold React components, hooks, and pages efficiently based on customizable templates. It supports both **ESM** and **CJS** builds and provides an extensible architecture for different project structures.

---

## 🚀 Features

- **Customizable Templates:** Define your own component structures with YAML configuration.
- **Supports Extensions:** Easily add Storybook, Jest, or other extensions.
- **Works with Both ESM & CJS:** Compatible with different module systems.
- **CLI-powered Scaffolding:** Generate files and directories with a single command.

---

## 📦 Installation

### Install Globally:

```sh
npm install -g react-nucleus
```

```sh
yarn global add react-nucleus
```

### Install Locally (for project-specific usage):

```sh
npm install react-nucleus --save-dev
```

```sh
yarn add react-nucleus --dev
```

---

## 🚀 Usage

### Scaffold a New Component

```sh
nucleus scaffold component Button in Atom Buttons storybook
```

### Command Structure

```sh
nucleus scaffold <templateName> <componentName> in <category> [subcategory] [extensions]
```

### Example:

```sh
nucleus scaffold component Input in FormElements TextFields jest,storybook
```

This command will:

- Create a `Input` component inside `FormElements/TextFields`
- Generate files based on the template configuration
- Include Jest & Storybook extensions if configured

---

## ⚙️ Configuration

React Nucleus uses a `.nucleus.yml` file for configuration. Example:

```yaml
settings:
  rootDirectory: output

categories:
  - name: Atom
    path: atoms
  - name: Molecule
    path: molecules

templates:
  component:
    extensions:
      - storybook
      - jest
    files:
      - name: "{{componentName}}.tsx"
        content: "export default function {{componentName}}() { return <div />; }"
      - name: "index.ts"
        content: "export { default } from './{{componentName}}';"
      - name: "interface.ts"
        content: "export interface I{{componentName}}Props {}"
```

---

## 🛠 Development

### Clone the repository:

```sh
git clone https://github.com/yourusername/react-nucleus.git
cd react-nucleus
```

### Install dependencies:

```sh
yarn install
```

### Build the package:

```sh
yarn build
```

### Run tests:

```sh
yarn test:watch
```

---

## 📝 Contributing

Pull requests and feature requests are welcome! However, please follow these guidelines to ensure code quality and maintainability:

### 🔹 Code Standards
- Ensure your code follows the **existing project structure** and **design patterns** (e.g., Adapter, Builder, Command).
- Keep the code **clean and modular**, avoiding unnecessary complexity.
- Use **dependency injection** wherever applicable.
- Avoid placing helper functions inside `commands/` or `core/`—instead, use proper **design patterns**.

### 🧪 Testing
- All new features **must include tests** (Unit & Integration).
- We use **Jest** for testing; ensure your code has at least **90% test coverage**.
- Run tests before submitting your PR:
  ```sh
  yarn test
  ```

### 🚀 Submitting a PR
1. **Fork** the repository and create a feature branch:
   ```sh
   git checkout -b feature/my-new-feature
   ```
2. Ensure all tests pass:
   ```sh
   yarn test
   ```
3. Format the code using Prettier & ESLint:
   ```sh
   yarn lint
   ```
4. Commit changes with a meaningful message:
   ```sh
   git commit -m "✨ Added support for XYZ"
   ```
5. Push to your fork and submit a **Pull Request (PR)**.

Following these steps ensures that contributions maintain a **high standard** and integrate smoothly into the project. 🚀🔥

## 📜 License

MIT License. See [LICENSE](./LICENSE) for details.

## 📌 Author

Created with ❤️ by **Radin Vafaei**
