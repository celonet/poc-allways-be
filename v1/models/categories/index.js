const mongoose = require('mongoose')

const { Schema } = mongoose

const Category = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 80
  }
}, { collection: 'category' })

module.exports = mongoose.model('category', Category)
