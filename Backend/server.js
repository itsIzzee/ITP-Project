const app = require('./App');
const dotenv = require('dotenv');
const path = require('path');
const connctDatabase = require('./config/database');

dotenv.config({path:path.join(__dirname,"config/config.env")});

connctDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server listening to the port : ${process.env.PORT} in ${process.env.NODE_ENV}`)
}) 

process.on('unhandledRejection', (err)=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(()=>{
        process.exit(1);
    })
})


process.on('uncaughtException', (err)=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to uncaught exception error');
    server.close(()=>{
        process.exit(1);
    })
})

