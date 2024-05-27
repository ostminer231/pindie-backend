const express = require('express');
const authRouter = require("./auth");
const categoriesRouter = require("./categories");
const gamesRouter = require("./games");
const usersRouter = require("./users");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/games", gamesRouter);
apiRouter.use("/categories", categoriesRouter);

module.exports = apiRouter;
