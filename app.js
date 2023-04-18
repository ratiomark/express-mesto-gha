require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const otherRouter = require('./routes/otherRoutes');
const {
	registerValidation,
	loginValidation,
	handleValidationErrors,
} = require('./validation/validation')
const { createUser, login } = require('./controllers/users')
const errorMiddleware = require('./middleware/error-middleware')
const authMiddleware = require('./middleware/auth-middleware')

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())


app.post('/signin',
	loginValidation,
	handleValidationErrors,
	login
);

app.post('/signup',
	registerValidation,
	handleValidationErrors,
	createUser
);


app.use(authMiddleware)
app.use('/*', otherRouter);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorMiddleware)

async function start() {
	try {
		const PORT = process.env.PORT || 3000
		app.listen(PORT, () => {
			console.log('Сервер запущен на порту ', PORT);
		});
	} catch (error) {
		console.log(error)
	}
}

start()
