const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: false
  },
  socialMediaLinks: {
    type: [String],
    required: false
  },
  contactInformation: {
    type: String,
    required: false
  }
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
