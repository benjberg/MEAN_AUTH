const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyparser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')
require('dotenv').config();

mongoose.connect(config.database)
mongoose.connection.on('connected', () => {
    console.log('connected to db ' + config.database)
})

mongoose.connection.on('error', ( err) => {
    console.log('database error ' + err)
})

const app = express()
const users = require("./routes/users")

const port = process.env.PORT

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.json())
app.use('/users' ,users)
app.get('/', (req,res) =>{
    res.send("invalid Endpoint")
})
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})