const User = require("../models/user.js");

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.status(404).send({message: "Пользователи не найдены"});
        return;
      }
      res.send(users);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const getUserById = (req, res) => {
  console.log(req.params);
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({message: "Такого пользователя не существует"});
      }
      res.send(user);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch(() => {
      const ERROR_CODE = 400;
      if (err.name === "ValidationError")
        return res
          .status(ERROR_CODE)
          .send({ message: `Переданы некорректные данные: ${err}` });
      res
        .status(500)
        .send({ message: "Произошла ошибка добавления нового пользователя" });
    });
};

const updateUser = (req, res) => {
  console.log(req.user._id);
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ user }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === "ValidationError")
        return res
          .status(ERROR_CODE)
          .send({ message: `Переданы некорректные данные: ${err}` });
      res
        .status(500)
        .send({ message: "Произошла ошибка обновления данных о пользователе" });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((newAvatar) => res.send({ newAvatar }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === "ValidationError")
        return res
          .status(ERROR_CODE)
          .send({ message: `Переданы некорректные данные: ${err}` });
      res.status(500).send({ message: "Произошла ошибка обновления аватара" });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  updateAvatar,
};
