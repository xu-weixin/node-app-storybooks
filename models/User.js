const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
  githubId: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  image: {
    type: String
  }
});

// create collection and add Schema
mongoose.model('user', UserSchema);
