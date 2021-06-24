const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

const { PORT = 3000 } = process.env;

const {login, createNewUser} = require('./controllers/users.js');
const auth = require('./middlewares/auth');
const usersRoutes = require("./routes/users.js");
const cardsRoutes = require("./routes/cards.js");

const NotFoundError = require("./errors/not-found-err");


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => console.log("Mongodb connected"));
mongoose.connection.on("error", (err) => console.log(`Ошибка ${err}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))


app.post('/signin', login);
app.post('/signup', createNewUser);
app.use(auth, usersRoutes);
app.use(auth, cardsRoutes);

app.use('*', (req,res) => {

  throw new NotFoundError("Не найден данный ресурс")
} );

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
});


app.listen(PORT, () => {
  console.log("Сервер запущен");
});
