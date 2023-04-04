// У меня нет желания и времени разбираться с тем как правильно пишут код в airbnb.
// Для меня адаптировать код под их нормы не имеет никакого смысла, я не получаю
// полезных знаний или навыков от этого процесса.
// Я думаю из того как я взаимодействую с eslint должно быть понятно,
// что я не только что с ним столкнулся и +- понимаю в чем его смысл.
module.exports = {
	env: {
		node: true,
		es6: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
	},
	extends: [
		'airbnb-base',
	],
	rules: {
		'linebreak-style': ['error', 'unix'],
		'no-underscore-dangle': [2, { allow: ['_id'] }],
		'max-classes-per-file': 'off',
		indent: [
			1, 'tab',
			{
				SwitchCase: 1,
			},
		],
		'no-tabs': 'off',
		'no-console': 'off',
		'no-param-reassign': 'off',
	},
};
