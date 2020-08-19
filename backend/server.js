const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

var mongoDB = 'mongodb://localhost:27017/fitness-tracker'
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true});
let db = mongoose.connection;

// Check mongoDB connection
db.once('open', function(){
    console.log('Connected to MongoDB');
})
// Check for DB errors
db.on('error', function(err){
    console.log(err);
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});