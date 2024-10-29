const express = require('express');
const db = require('./db');  // Ensure you have a connection to your database
const app = express();

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const PORT = process.env.PORT || 3000;
//user routes
const userRoutes = require('./routes/userRoutes'); 
app.use('/user',userRoutes)
//candidate routes
const candidateRoutes = require('./routes/candidateRoutes'); 
app.use('/candidate',candidateRoutes)
app.listen(PORT, ()=> {
    console.log('Server listening on 3000')
})