//for connection of database
const mongoose = require('mongoose')

//define url for mngopdb

const mongoURL = 'mongodb://localhost:27017/voting'

//set up connection
mongoose.connect(mongoURL,{
   
})

const db = mongoose.connection

db.on('connected', () => {
    console.log('connected to database')
})
db.on('error', (err) => {
    console.log('error to connect with database')
})
db.on('disconnected', () => {
    console.log('disconnected to database')
})

//export this db to server file main file

module.exports = db