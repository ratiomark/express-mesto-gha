module.exports = {
	env: {
		node: true,
		es6: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
	},
	extends: [
		// 'airbnb-base',
	],

	rules: {
		// 'linebreak-style': ['error', 'windows'],
		'no-underscore-dangle': [2, { allow: ['_id', '_doc'] }],
	},
};
