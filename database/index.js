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

const save = (body, callback) => {
  const repos = JSON.parse(body).map((object) => {
    const repo = new Repo({
      _id: object.id,
      user_name: object.owner.login,
      repo_name: object.name,
      stargazers_count: object.stargazers_count,
      watchers_count: object.watchers_count,
      forks_count: object.forks_count
    });
    return repo;
  });

  Repo.create(repos, callback);
}

module.exports.save = save;