const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./models/user');
const config = require('./config/config.json');
const errorHandler = require('./util/errorHandler');
const jwt = require('./util/jwt');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', err => console.log(err));
db.once('open', () => console.log('Connected to MongoDb...'));

app.get('/api/user', (req, res) => {
  console.log('It works');
  user.findOne({ firstName: 'Dzianis' })
    .then(userData => res.send(userData))
    .catch(error => res.status(500, { error }));
});

// use JWT auth to secure the api
app.use(jwt());

// Create a global user object
app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

// api user routes
app.use('/api', require('./controller/userController'));

// Common error handler
app.use(errorHandler);

app.listen(5000, () => console.log('Server is running'));
