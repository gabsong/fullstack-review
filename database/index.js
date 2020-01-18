const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const repoSchema = new mongoose.Schema({
  _id: Number, // primary key
  user_name: String,
  repo_name: String,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number
});

const Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;