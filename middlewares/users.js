// Файл middlewares/users.js

// Импортируем модель
const users = require('../models/user');
const bcrypt = require("bcryptjs"); // Импортируем bcrypt 


const findAllUsers = async (req, res, next) => {
  // По GET-запросу на эндпоинт /users найдём все документы пользователей
  req.usersArray = await users.find({});
  next();
}

const createUser = async (req, res, next) => {
  console.log("Creating user with data:", req.body);
  try {
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    console.error("Error creating user:", error);
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка создания пользователя" }));
  }
};

// middlewares/users.js
const findUserById = async (req, res, next) => {
  console.log("GET /users/:id");
  try {
    req.user = await users.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
  }
};


const updateUser = async (req, res, next) => {
  try {
    // Обновление только полей name и email
    const updateData = {};
    if (req.body.username) updateData.username = req.body.username;
    if (req.body.email) updateData.email = req.body.email;
    
    req.user = await users.findByIdAndUpdate(req.params.id, updateData, { new: true });
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка обновления пользователя" }));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    // Методом findByIdAndDelete по id находим и удаляем документ из базы данных
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
  }
};

const checkIsUserExists = async (req, res, next) => {
  const existingUser = await users.findOne({ username: req.body.username });
  console.log("Existing user:", existingUser);
  if (existingUser) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Пользователь с таким названием уже существует" }));
  } else {
    next();
  }
};


const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  console.log("Check for empty fields:", req.body);
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Имя, email и пароль обязательны для заполнения" }));
  } else {
    next();
  }
};

const checkEmptyNameAndEmail = (req, res, next) => {
  if (!req.body.username && !req.body.email) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Имя и email обязательны для заполнения" }));
  } else {
    next();
  }
};

const filterPassword = (req, res, next) => {
  const filterUser = (user) => {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  };
  if (req.user) {
    req.user = filterUser(req.user);
  }
  if (req.usersArray) {
    req.usersArray = req.usersArray.map((user) => filterUser(user));
  }
  next();
}; 


const hashPassword = async (req, res, next) => {
  try {
    // Создаём случайную строку длиной в десять символов
    const salt = await bcrypt.genSalt(10);
    // Хешируем пароль
    const hash = await bcrypt.hash(req.body.password, salt);
    // Полученный в запросе пароль подменяем на хеш
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
}; 


// Экспортируем функцию поиска всех пользователей
module.exports = {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  filterPassword,
  hashPassword
};