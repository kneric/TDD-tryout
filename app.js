require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const cors = require('cors');

const index = require('./routes/index');
const article = require('./routes/article');

if (!process.env.NODE_ENV){
  process.env.NODE_ENV = 'dev'
}

const DB_URL = {
  dev: process.env.DB_dev,
  test: process.env.DB_test
}

mongoose.connect(`${DB_URL[process.env.NODE_ENV]}`, {useNewUrlParser: true})
.then(()=> {
  console.log(`connected to ${process.env.NODE_ENV} database`);
})
.catch(err => {
  console.log(err);
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', index)
app.use('/article', article)

app.listen(port, ()=> {
  console.log(`listening to ${port}`);
})

module.exports = app;