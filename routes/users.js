const usersRoutes = require('express').Router();

const {  getAllUsers, getUserById, createNewUser } = require('../controllers/users');

usersRoutes.get('/users', getAllUsers);

usersRoutes.get('/users/:id', getUserById);

usersRoutes.post('/users', createNewUser);

module.exports = usersRoutes;