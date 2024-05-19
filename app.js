const express = require('express');
const path = require('path');
const mainRoute = require('./routes/main');
const bodyParser = require('body-parser');
const { cors } = require('./middlewares/cors');

const app = express();
const PORT = 3000;
app.use(
    cors,
    bodyParser.json(),
    express.static(path.join(__dirname, 'public')),
    mainRoute
);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

