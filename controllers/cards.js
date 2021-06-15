const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({}).then((cards) => {
    if (cards.length === 0) {
      res.send({message: "Карточки не найдены"});
      return;
    }
    res.status(200).send({data: cards})
  }).catch(() => res.status(500).send({ message: "Произошла ошибка" }))
}

module.exports.createNewCard = (req,res) => {

  const { name, link } = req.params;
  Card.create({ name, link } ).then((card) => {
    res.status(200).send(card)
  }).catch(() => res.status(500).send({ message: "Произошла ошибка" }))
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).then((card) => {
    if (!card) {
      res.send({message: "Нет карточки с данным id"});
      return;
    }
    res.status(200).send(card)
  }).catch(() => res.status(500).send({ message: "Произошла ошибка" }))
}

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)