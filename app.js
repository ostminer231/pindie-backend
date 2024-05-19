const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Импортируем пакет CORS

const connectToDatabase = require('./database/connect');
const api = require('./routes/api');
const pagesRouter = require('./routes/pages');
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

connectToDatabase();

// Использование пакета CORS
app.use(cors({
  origin: 'http://localhost:3000', // Разрешить запросы с этого источника
  methods: 'GET, POST, PUT, DELETE, OPTIONS', // Разрешить эти методы
  allowedHeaders: 'Content-Type' // Разрешить эти заголовки
}));

// Middleware для обработки JSON-запросов
app.use(cookieParser(), bodyParser.json(), pagesRouter);

// Middleware для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Привязка маршрутов с базовыми путями
app.use(api);


// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
