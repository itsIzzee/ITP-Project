const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const path = require('path')

app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); 
app.use('/uploads', express.static(path.join(__dirname,'/uploads')))



const auth = require('./routes/auth')
const seller = require ('./routes/sellerRoute')
const userInformation = require('./routes/info'); // New route for user and seller information



app.use('/api/v1/',auth);
app.use('/api/v1/',seller);
app.use('/api/v1/', userInformation); // Integrate user and seller information routes



app.use(errorMiddleware)


module.exports = app; 