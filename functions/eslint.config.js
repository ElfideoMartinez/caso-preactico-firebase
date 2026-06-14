const tseslint = require("@typescript-eslint/eslint-plugin");
const parser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");

module.exports = [
  {
    ignores: ["lib/**", "generated/**"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.dev.json"],
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin,
    },
    rules: {
      quotes: ["error", "double"],
      "import/no-unresolved": "off",
      indent: ["error", 2],
    },
  },
];
