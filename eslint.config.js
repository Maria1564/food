import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import"; 
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },

  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "import": importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],       // Глобальные и внешние импорты
            'internal',                    // Импорты из вашего проекта
            ['parent', 'sibling', 'index'],// Относительные импорты
          ],
          pathGroups: [
            {
              pattern: "**/*.{css,scss,module.scss,module.css}", // Стили
              group: 'index',                // Последняя группа
              position: 'after',             // В самом конце
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin", "external"], // Исключаем глобальные
          'newlines-between': 'always', // Разделение групп пустыми строками
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  }
);