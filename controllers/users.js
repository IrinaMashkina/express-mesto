const User = require('../models/user');

const getAllUsers = (req,res) => {
  User.find({})
  .then((users) => {
    if (users.length === 0) {
      res.send("Пользователи не найдены")
      return;
    }
    res.status(200).send(users)})
  .catch((err) => res.send(err))
}

const getUserById = (req,res) => {
  User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      res.send("Пользователь не найден")
    }
    res.status(200).send(user)})
  .catch((err) => res.send(err))
}

const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((newUser) => {
    res.status(200).send(newUser)
  }).catch((err) => res.send(err))
}

module.exports = { getAllUsers, getUserById, createNewUser };