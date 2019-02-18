const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
const user = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/belavia', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => console.log('Connected to MongoDb...'));

app.get('/api/user', (req, res) => {
  console.log('It works');
  user.findOne({ firstName: 'Dzianis' })
    .then(userData => res.send(userData))
    .catch(error => res.status(500, { error }));
});

app.listen(5000, () => console.log('Server is running'));
