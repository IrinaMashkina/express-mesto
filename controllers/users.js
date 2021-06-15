const User = require("../models/user");

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.send("Пользователи не найдены");
        return;
      }
      res.status(200).send({data: users});
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.send("Такого пользователя не существует");
      }
      res.status(200).send({ data: user});
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  console.log(`body: ${req.body}`)
  User.create({ name, about, avatar })
    .then((newUser) => {
      res.status(200).send({newUser});
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка добавления нового пользователя" }));
};

