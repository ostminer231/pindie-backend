// Создаём роут для запросов пользователей 
const categoriesRouter = require('express').Router();

// Импортируем вспомогательные функции
const { findAllCategories, createCategory, findCategoryById, updateCategory, deleteCategory } = require('../middlewares/categories');
const { sendAllCategories, sendCategoryCreated, sendCategoryById, sendCategoryUpdated, sendCategoryDeleted } = require('../controllers/categories');

// Обрабатываем GET-запрос с роутом '/users'
categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.post("/games", findAllCategories, createCategory, sendCategoryCreated);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
categoriesRouter.put(
  "/categories/:id", // Слушаем запросы по эндпоинту
  updateCategory, // Обновляем запись в MongoDB
  sendCategoryUpdated // Возвращаем ответ на клиент
);
categoriesRouter.delete(
  "/categories/:id", // Слушаем запросы по эндпоинту
  deleteCategory,
  sendCategoryDeleted // Тут будут функция удаления элементов из MongoDB и ответ клиенту
);

// Экспортируем роут для использования в приложении — app.js
module.exports = categoriesRouter;