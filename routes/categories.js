// Создаём роут для запросов пользователей 
const categoriesRouter = require('express').Router();

// Импортируем вспомогательные функции
const findAllCategories = require('../middlewares/categories');
const sendAllCategories = require('../controllers/categories');

// Обрабатываем GET-запрос с роутом '/users'
categoriesRouter.get('/categories', findAllCategories, sendAllCategories);

// Экспортируем роут для использования в приложении — app.js
module.exports = categoriesRouter;