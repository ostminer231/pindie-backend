const express = require('express');
const usersRouter = express.Router();
const {
  findAllUsers, createUser, findUserById, updateUser, deleteUser,
  checkEmptyNameAndEmailAndPassword, checkEmptyNameAndEmail,
  filterPassword, checkIsUserExists, hashPassword
} = require('../middlewares/users');
const {
  sendAllUsers, sendUserCreated, sendUserById, sendUserUpdated, sendUserDeleted, sendMe
} = require('../controllers/users');
const { checkAuth } = require('../middlewares/auth');

usersRouter.get('/', findAllUsers, filterPassword, sendAllUsers);
usersRouter.post(
  "/",
  checkIsUserExists,
  findAllUsers,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.get('/:id', findUserById, filterPassword, sendUserById);
usersRouter.put(
  "/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);usersRouter.delete('/:id', checkAuth, deleteUser, sendUserDeleted); 
usersRouter.get('/me', checkAuth, sendMe);

module.exports = usersRouter;
