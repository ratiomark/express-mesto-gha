const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users')
const cardRouter = require('./routes/cards')
const otherRouter = require('./routes/otherRoutes')
const bodyParser = require('body-parser');
const { PORT = 3000, BASE_PATH } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	req.user = {
		_id: '642a1f72b758daa9a014231e'
	}
	next()
})

app.use('/', userRouter)
app.use('/', cardRouter)
app.use('/*', otherRouter)


app.listen(PORT, () => {
	console.log('Сервер запущен на порту ', PORT);
});