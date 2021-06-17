const Card = require("../models/card");
const { ERROR_CODE } = require("../utils/constants");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        res.send({ message: "Карточки не найдены" });
        return;
      }
      res.send(cards);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
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
          .status(ERROR_CODE)
          .send({ message: "Переданы некорректные данные" });
      res.status(500).send({
        message: `Произошла ошибка добавления новой карточки: ${err}`,
      });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(ERROR_CODE)
          .send({ message: "Карточка с данным id отсутствует" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка удаления карточки" });
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(ERROR_CODE)
          .send({ message: "Карточка с данным id отсутствует" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(ERROR_CODE)
          .send({ message: "Карточка с данным id отсутствует" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
