const express = require('express');
const app = express();
const morgan = require('morgan');
const github = require('../helpers/github.js');
const mongo = require('../database');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/repos', function(req, res, next) {
  github.getReposByUsername(req.body.data, (error, body) => {
    if (error) {
      console.log('Error in getReposByUsername:', error);
    } else {
      mongo.save(body, (error, body) => {
        if (error) {
          // error handling for duplicate primary keys
          if (error.name === 'MongoError' && error.code === 11000) {
            console.log('Duplicate primary key:', error);
            res.status(200).send(error);
          } else {
            res.status(400).send(error);
          }
        } else {
          res.status(201).send(`Repos from ${body} added to the database`);
        }
      });
    }
  });
});

app.get('/repos', function(req, res, next) {
  mongo.find((error, results) => {
    if (error) {
      console.log('Error querying mongo:', error);
      res.status(404).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

