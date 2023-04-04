const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const otherRouter = require('./routes/otherRoutes');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	req.user = {
		_id: '642c304a23023f99a6a65e07',
	};
	next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/*', otherRouter);

app.listen(PORT, () => {
	console.log('Сервер запущен на порту ', PORT);
});
