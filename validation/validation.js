const { body, validationResult } = require('express-validator');
// // с помощью body будем проверять есть ли в теле запроса определенная информация



const registerValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Слишком короткий пароль').isLength({ min: 3, }),
	body('avatar').optional().isURL(),
];

const loginValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Слишком короткий пароль').isLength({ min: 3, }),
];


const handleValidationErrors = (req, res, next) => {
	// похоже, что сюда автоматом попадет результат registerValidation
	const errors = validationResult(req)
	if (!errors.isEmpty()) return res.status(400).json(errors.array())
	next()
}
module.exports = {
	registerValidation,
	loginValidation,
	handleValidationErrors,
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
