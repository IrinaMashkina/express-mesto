const cardsRoutes = require('express').Router();

const { getCards, createNewCard, deleteCard } = require('../controllers/cards');

cardsRoutes.get('/cards', getCards);
cardsRoutes.post('/cards', createNewCard);
cardsRoutes.delete('/cards/:cardId', deleteCard);

module.exports = cardsRoutes;
