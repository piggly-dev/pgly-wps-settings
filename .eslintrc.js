module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'airbnb-base',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		// allow paren-less arrow functions
		'arrow-parens': ['error', 'as-needed'],
		// set maximum line characters
		'max-len': [
			'error',
			140,
			4,
			{
				ignoreUrls: true,
				ignoreTemplateLiterals: true,
				ignoreStrings: true,
			},
		],
		quotes: [
			'error',
			'single',
			{
				avoidEscape: true,
				allowTemplateLiterals: true,
			},
		],
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'only-multiline',
			},
		],
		// allow debugger during development
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-underscore-dangle': 'off',
		'no-return-assign': 'off',
		'no-empty': 'error',
		'array-bracket-spacing': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'],
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				named: 'always',
				asyncArrow: 'always',
			},
		],
		'no-return-await': 'warn',
		'object-shorthand': ['error', 'always'],
		'no-extra-semi': 'error',
		'prefer-const': [
			'error',
			{
				destructuring: 'all',
				ignoreReadBeforeAssign: true,
			},
		],
		'no-prototype-builtins': 'off',
		'no-void': 'off',
		'no-case-declarations': 'off',
		'no-var': 'error',
		'no-plusplus': 'off',
		'no-bitwise': 'off',
		'import/extensions': 'off',
		'import/no-unresolved': 'off',
		'no-unused-vars': 'off',
		'class-methods-use-this': 'off',
		'no-multi-assign': 'off',
		eqeqeq: 'off',
		'max-classes-per-file': 'off',
		'max-statements': ['error', 40],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
	},
};
