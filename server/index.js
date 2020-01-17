const express = require('express');
const app = express();
const morgan = require('morgan');
let github = require('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // models.get(callback);
  // if (err) {
  //   console.log('error', err);
  //   res.sendStatus(400);
  // } else {
  //   console.log('success', data);
  //   res.send('GET request to /repos');
  // }
  github.getReposByUsername('gabsong', (error, response) => {
    if (error) {
      console.log('This is an error:', error);
    } else {
      console.log('This is a response:', response);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

