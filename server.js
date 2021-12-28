// const http = require('http');
// const app = require('./app');

const express = require("express")

const app = express()

const connectDB = require("./config/connectDB")
connectDB()

const router = require('./routes/person')
app.use(router)

const port = 5000

app.listen(port, (error) => {
    error ? console.log('Error server !!!')
    : console.log("server is running at localhost:5000");
});