const request = require('request');
// const config = require('../config.js');
const path = require('path');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  };

  request.get(options, (error, response, body) => {
    if (error) {
      console.log('Error in request.get', error);
      callback(error, null);
    } else {
      callback(null, body); // === response.body
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;