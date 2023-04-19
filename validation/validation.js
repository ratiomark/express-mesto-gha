const { body, param, validationResult } = require('express-validator');
const ObjectId = require('mongoose').Types.ObjectId
const { ApiError } = require('../Errors/Errors')
// // с помощью body будем проверять есть ли в теле запроса определенная информация



const registerValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Слишком короткий пароль').isLength({ min: 3, }),
	body('avatar').optional().isURL(),
	body('name').optional().isLength({ min: 2, max: 30 }),
	body('about').optional().isLength({ min: 2, max: 30 }),
];

const loginValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Слишком короткий пароль').isLength({ min: 3, }),
];

const avatarValidation = [
	body('avatar').isURL(),
]

const patchUserDataValidation = [
	body('avatar').optional().isURL(),
	body('name').optional().isLength({ min: 2, max: 30 }),
	body('about').optional().isLength({ min: 2, max: 30 }),
];

const newCardValidation = [
	body('link').isURL(),
	body('name').isLength({ min: 2, max: 30 }),
];

const userIdParamsValidation = [
	param('userId').custom(async value => {
		if (!ObjectId.isValid(value)) throw ApiError.BadRequest()
	}),
];


const cardIdParamsValidation = [
	param('cardId').custom(async value => {
		if (!ObjectId.isValid(value)) throw ApiError.BadRequest()
	}),
];


const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) return next(ApiError.BadRequest())
	// .json(errors.array())
	next()
}

module.exports = {
	registerValidation,
	loginValidation,
	handleValidationErrors,
	patchUserDataValidation,
	avatarValidation,
	userIdParamsValidation,
	cardIdParamsValidation,
	newCardValidation
}
// export const loginValidation = [
//   // функция сама чекает, что данные являются мылом
//   body('email', 'Неверный формат почты').isEmail(),
//   body('password', 'Слишком короткий пароль').isLength({ min: 2 }),
// ];

// export const postCreateValidation = [
//   // функция сама чекает, что данные являются мылом
//   body('title', 'Нет названия статьи').isLength({ min: 2 }).isString(),
//   body('text', 'Нет текста статьи').isLength({ min: 2 }).isString(),
//   body('tags', 'Неверный формат тегов(укажите массив)').isArray(),
//   // если аватар не придет, то ничего страшного, но если придет, то проверь что это урл
//   // body('avatar').optional().isURL(),
//   // body('role', 'Укажите роль').isIn(['ADMIN', 'USER', 'MANAGER'])
// ];
