// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const connectToDatabase = require('./database/connect');
const api = require('./routes/api');
const pagesRouter = require('./routes/pages');
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3001;

connectToDatabase();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Access-Control-Allow-Headers',
    'Origin',
    'Accept',
    'X-Requested-With',
    'Content-Type',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'Authorization'
  ]
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(pagesRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
