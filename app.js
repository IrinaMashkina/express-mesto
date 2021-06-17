const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

const { PORT = 3000 } = process.env;



const usersRoutes = require("./routes/users.js");
const cardsRoutes = require("./routes/cards.js");


// подключаемся к серверу mongo
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


app.use((req, res, next) => {
  req.user = {
    _id: "60cafd5faf49242ec0b94a45",
  };

  next();
});

app.use(usersRoutes);
app.use(cardsRoutes);

app.use('*', (req,res) => {

  res.status(404).send({message:"Не найден данный ресурс"})
} );

app.listen(PORT, () => {
  console.log("Сервер запущен");
});
