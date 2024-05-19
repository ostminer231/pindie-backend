// Создаём роут для запросов категорий 
const usersRouter = require('express').Router();

// Импортируем вспомогательные функции
const { findAllUsers, createUser, findUserById, updateUser, deleteUser} = require('../middlewares/users');
const {sendAllUsers, sendUserCreated, sendUserById, sendUserUpdated, sendUserDeleted} = require('../controllers/users');

// Обрабатываем GET-запрос с роутом '/categories'
usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.post("/users", findAllUsers, createUser, sendUserCreated);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.put(
    "/users/:id", // Слушаем запросы по эндпоинту
    updateUser, // Обновляем запись в MongoDB
    sendUserUpdated // Возвращаем ответ на клиент
  ); 

usersRouter.delete(
  "/users/:id", // Слушаем запросы по эндпоинту
  deleteUser,
  sendUserDeleted // Тут будут функция удаления элементов из MongoDB и ответ клиенту
); 
module.exports = usersRouter;
