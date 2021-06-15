const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { PORT = 3000 } = process.env;

const bodyParser = require("body-parser");

const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");


// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/", usersRoutes);
app.use("/", cardsRoutes);

app.listen(PORT, () => {
  console.log("Ссылка на сервер");
});
