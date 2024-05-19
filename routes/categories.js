// Создаём роут для запросов пользователей 
const categoriesRouter = require('express').Router();

// Импортируем вспомогательные функции
const {findAllCategories, createCategory, findCategoryById} = require('../middlewares/categories');
const {sendAllCategories, sendCategoryCreated, sendCategoryById} = require('../controllers/categories');

// Обрабатываем GET-запрос с роутом '/users'
categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.post("/games", findAllCategories, createCategory, sendCategoryCreated);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);

// Экспортируем роут для использования в приложении — app.js
module.exports = categoriesRouter;