const User = require("../models/user.js");
const {
  BAD_REQUEST_ERROR,
  SERVER_ERROR,
  NOT_FOUND_ERROR,
} = require("../utils/constants");

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.send({ message: "Пользователи не найдены" });
        return;
      }
      res.send(users);
    })
    .catch(() =>
      res.status(SERVER_ERROR).send({ message: "Произошла ошибка" })
    );
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND_ERROR)
          .send({ message: "Пользователя с таким id не существует" });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError")
        return res.status(BAD_REQUEST_ERROR).send({ message: "Невалидный id" });

      res.status(SERVER_ERROR).send({ message: "Произошла ошибка" });
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
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Переданы некорректные данные" });

      res.status(SERVER_ERROR).send({ message: "Произошла ошибка" });
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
          .status(BAD_REQUEST_ERROR)
          .send({
            message: "Переданы некорректные данные при обновлении профиля",
          });
      res.status(SERVER_ERROR).send({ message: "Произошла ошибка" });
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
        return res.status(BAD_REQUEST_ERROR).send({
          message: "Переданы некорректные данные при обновлении аватара",
        });

      res.status(SERVER_ERROR).send({ message: "Произошла ошибка" });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  updateAvatar,
};
