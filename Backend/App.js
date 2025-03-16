const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')

app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); 


const products = require('./routes/product')
const auth = require('./routes/auth')

app.use('/api/v1/',products);
app.use('/api/v1/',auth);

app.use(errorMiddleware)


module.exports = app; 