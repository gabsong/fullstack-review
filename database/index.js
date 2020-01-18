const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const repoSchema = new mongoose.Schema({
  _id: Number, // primary key
  user_name: String,
  user_url: String,
  repo_name: String,
  html_url: String,
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
      user_url: object.owner.url,
      repo_name: object.name,
      html_url: object.html_url,
      stargazers_count: object.stargazers_count,
      watchers_count: object.watchers_count,
      forks_count: object.forks_count
    });
    return repo;
  });

  Repo.create(repos, callback);
}

const find = (callback) => {
  const query = Repo.find();

  // sort and limit the query
  query.sort({ "stargazers_count": -1 }).limit(25).exec(callback);
}

module.exports.save = save;
module.exports.find = find;