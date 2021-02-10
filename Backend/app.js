const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const user = require('./routes/user');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

//const authRoutes = require('./routes/auth');

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

app.use('/auth', auth);
app.use('/admin', admin);
app.use('/user', user);

mongoose
  .connect(process.env.DB_CONNECT, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
  .then(result => {
    app.listen(3000);
    console.log("Konektovano")
  })
  .catch(err => {
    console.log(err);
  });