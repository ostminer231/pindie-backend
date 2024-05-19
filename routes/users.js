// Создаём роут для запросов категорий 
const usersRouter = require('express').Router();

// Импортируем вспомогательные функции
const { findAllUsers, createUser, findUserById} = require('../middlewares/users');
const {sendAllUsers, sendUserCreated, sendUserById} = require('../controllers/users');

// Обрабатываем GET-запрос с роутом '/categories'
usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.post("/users", findAllUsers, createUser, sendUserCreated);
usersRouter.get("/users/:id", findUserById, sendUserById);

// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;
