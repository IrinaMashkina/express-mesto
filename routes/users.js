const usersRoutes = require('express').Router();

const {  getAllUsers, getUserById, createNewUser, updateUser, updateAvatar } = require('../controllers/users.js');

usersRoutes.get('/users', getAllUsers);
usersRoutes.get('/users/:id', getUserById);
usersRoutes.post('/users', createNewUser);
usersRoutes.patch('/users/me', updateUser);
usersRoutes.patch('/users/me/avatar', updateAvatar);

module.exports = usersRoutes;