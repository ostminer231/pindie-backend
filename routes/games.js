const express = require('express');
const gamesRouter = express.Router();

const { findAllGames, createGame, findGameById, updateGame, deleteGame, checkEmptyFields, checkIfUsersAreSafe, checkIfCategoriesAvaliable, checkIsGameExists, checkIsVoteRequest } = require('../middlewares/games');
const { sendAllGames, sendGameCreated, sendGameById, sendGameUpdated, sendGameDeleted } = require('../controllers/games');
const { checkAuth } = require('../middlewares/auth');

// Определение маршрутов
gamesRouter.get('/', findAllGames, sendAllGames);

gamesRouter.post('/', checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  createGame,
  sendGameCreated
);
gamesRouter.get('/:id', findGameById, sendGameById);

gamesRouter.put(
  "/:id",
  findGameById,
  checkIsVoteRequest,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  updateGame,
  sendGameUpdated
);

gamesRouter.delete('/:id', checkAuth, findGameById, deleteGame, sendGameDeleted);

module.exports = gamesRouter;
