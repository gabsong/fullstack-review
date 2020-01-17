const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:${port}/${route}`, {useNewUrlParser: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

module.exports = {
  get: (callback) => {
  },

  post: (data, callback) => {

  }
}