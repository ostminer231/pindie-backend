// Файл middlewares/games.js

// Импортируем модель
const games = require("../models/game");

const findAllGames = async (req, res, next) => {
  // По GET-запросу на эндпоинт /games найдём все документы категорий
  // и с помощью метода populate запросим данные о связанных
  // категориях и пользователях
  req.gamesArray = await games.find({}).populate("categories").populate("users");
  next();
};

// Экспортируем функцию поиска всех игр
module.exports = findAllGames;