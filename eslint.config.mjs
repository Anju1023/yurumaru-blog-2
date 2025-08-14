import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		plugins: {
			'better-tailwindcss': require('eslint-plugin-better-tailwindcss'),
		},
		rules: {
			'better-tailwindcss/no-custom-classname': 'warn',
		},
	},
	{
		files: ['**/*.css'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		rules: {
			'@typescript-eslint/no-unused-vars': 'off',
			'no-unused-vars': 'off',
		},
	},
	{
		files: ['**/*.css'],
		rules: {
			unknownAtRules: 'off',
		},
	},
];

export default eslintConfig;
