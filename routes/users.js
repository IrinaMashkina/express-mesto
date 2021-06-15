const usersRouter = require('express').Router();

const {  getAllUsers, getUserById, createNewUser } = require('../controllers/users');

usersRouter.get('/users', getAllUsers);

usersRouter.get('/users/:id', getUserById);

usersRouter.post('/users', createNewUser);

module.exports = usersRouter;