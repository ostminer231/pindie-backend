const express = require('express');
const categoriesRouter = express.Router();

// Импортируем вспомогательные функции
const { findAllCategories, createCategory, findCategoryById, updateCategory, deleteCategory, checkIsCategoryExists, checkEmptyName } = require('../middlewares/categories');
const { sendAllCategories, sendCategoryCreated, sendCategoryById, sendCategoryUpdated, sendCategoryDeleted } = require('../controllers/categories');
const { checkAuth } = require('../middlewares/auth');

// Определение маршрутов
categoriesRouter.get('/', findAllCategories, sendAllCategories);

categoriesRouter.post(
    "/",
    findAllCategories,
    checkIsCategoryExists,
    checkEmptyName,
    checkAuth,
    createCategory,
    sendCategoryCreated
  );
categoriesRouter.get('/:id', findCategoryById, sendCategoryById);

categoriesRouter.put(
    "/:id",
    checkEmptyName,
    checkAuth,
    updateCategory,
    sendCategoryUpdated
  );

  categoriesRouter.delete(
    "/:id",
    checkAuth,
    deleteCategory,
    sendCategoryDeleted
  ); 

// Экспортируем роут для использования в приложении — app.js
module.exports = categoriesRouter;
