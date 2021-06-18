const Card = require("../models/card");
const { BAD_REQUEST_ERROR, SERVER_ERROR, NOT_FOUND_ERROR } = require("../utils/constants");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        res.send({ message: "Карточки не найдены" });
        return;
      }
      res.send(cards);
    })
    .catch(() => res.status(SERVER_ERROR).send({ message: "Произошла ошибка" }));
};

module.exports.createNewCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError")
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Переданы некорректные данные" });
      res.status(SERVER_ERROR).send({
        message: `Произошла ошибка добавления новой карточки: ${err}`,
      });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)

    .then((card) => {
      if (!card) {

        res.status(NOT_FOUND_ERROR).send({ message: "Нет карточки с данным id" });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Такого id быть не может" });
        return;
      }
      res.status(SERVER_ERROR).send({ message: "Произошла ошибка" });
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(BAD_REQUEST_ERROR).send({ message: "Нет карточки с данным id" });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      console.groupCollapsed(err.name);
      if (err.name === "CastError") {
        res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Такого id быть не может" });
        return;
      }
      res.status(SERVER_ERROR).send({ message: "Произошла ошибка" });
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(BAD_REQUEST_ERROR).send({ message: "Нет карточки с данным id" });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Такого id быть не может" });
        return;
      }
      res.status(SERVER_ERROR).send({ message: "Произошла ошибка" });
    });
