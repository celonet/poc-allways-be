'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const Card = new Schema({
  chapter: {
    type: Schema.Types.ObjectId,
    ref: 'chapter'
  },
  category: [{
    type: Schema.Types.ObjectId,
    ref: 'category'
  }],
  subject: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 80
  },
  description: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 1500
  },
  created_at: {
    type: Date,
    required: true,
    minlength: 2,
    maxlength: 80
  },
  updated_at: {
    type: Date,
    required: false,
    minlength: 2,
    maxlength: 80
  }
}, { collection: 'card' });

Card.index({ chapter: 1, category: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model('card', Card);
