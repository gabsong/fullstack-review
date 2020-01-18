const express = require('express');
const app = express();
const morgan = require('morgan');
const github = require('../helpers/github.js');
const mongo = require('../database');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/repos', function (req, res) {
  github.getReposByUsername(req.body.username, (error, body) => {
    if (error) {
      console.log('Error in getReposByUsername', error);
    } else {
      mongo.save(body, (error, success) => {
        if (error) {
          // handle "existing primary key" error
        } else {
          res.status(201).send(`Repos from ${req.body.username} added to the database`);
        }
      });
    }
  });
});

app.get('/repos', function (req, res) {
  mongo.find((error, results) => {
    if (error) {
      console.log('Error querying mongo:', error);
    } else {
      res.send(results);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

