const mongoose = require('mongoose')

const { Schema } = mongoose

const Chapter = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 80
  },
  initials: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 4
  }
}, { collection: 'chapter' })

module.exports = mongoose.model('chapter', Chapter)
