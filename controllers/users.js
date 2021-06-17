const User = require("../models/user.js");
const { ERROR_CODE } = require("../utils/constants");

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.send({ message: "Пользователи не найдены" });
        return;
      }
      res.send(users);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError")
        return res
          .status(ERROR_CODE)
          .send({ message: "Такого пользователя не существует" });

      res.status(500).send({ message: "Произошла ошибка" });
    });
};

const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err.name === "ValidationError")
        return res
          .status(ERROR_CODE)
          .send({ message: "Переданы некорректные данные" });

      res
        .status(500)
        .send({ message: "Произошла ошибка добавления нового пользователя" });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => res.send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError")
        return res
          .status(ERROR_CODE)
          .send({ message: "Переданы некорректные данные" });
      res
        .status(500)
        .send({ message: "Произошла ошибка обновления данных о пользователе" });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((newAvatar) => res.send(newAvatar))
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(ERROR_CODE).send({
          message: "Переданы некорректные данные",
        });

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
