module.exports = {
	env: {
		// browser: true,
		// es2021: true,
		node: true,
		'es6': true
		// jest: true,
	},
	parserOptions: {
		ecmaVersion: 'latest'
	},

	rules: {
		semi: ['error', 'never'],
		indent: [
			1, 'tab',
			{
				'SwitchCase': 1
			}
		],
		'no-mixed-spaces-and-tabs': [
			1, 'smart-tabs'
		],

		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-unused-vars': 'off',
		'no-shadow': 'off',
		'no-underscore-dangle': 'off',
		'no-undef': 'off',
		'quotes': [
			2, 'single',
			{
				'avoidEscape': true
			}
		],
		'max-len': [
			0,
			{
				ignoreComments: true,
				ignoreTrailingComments: true,
				ignoreUrls: true,
				ignoreStrings: true,
			},
		],
	},
}