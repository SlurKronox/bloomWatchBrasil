// slurkronox/bloomwatch-brasil-techers/bloomwatch-brasil-techers-ac71067e3e30b0cb7c9e5e21329805911e61af62/eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import pluginJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import pluginReact from "eslint-plugin-react";

export default [
  { ignores: ["dist"] },
  js.configs.recommended,
  pluginJsxRuntime,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      "react": pluginReact,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
    },
  },
];