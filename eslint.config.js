import js from '@eslint/js';
import globals from 'globals';
import hooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
export default [
 js.configs.recommended,
 ...tseslint.configs.recommended.map(config=>({...config,files:['src/**/*.{ts,tsx}']})),
 {
  files:['src/**/*.{js,jsx,ts,tsx}'],
  languageOptions:{globals:globals.browser,parserOptions:{ecmaFeatures:{jsx:true}}},
  plugins:{'react-hooks':hooks},
  rules:{...hooks.configs.recommended.rules},
 },
 {files:['src/**/*.{js,jsx}'],rules:{'no-unused-vars':['error',{varsIgnorePattern:'^[A-Z]'}]}},
];
