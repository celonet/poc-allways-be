'use strict';

const Joi = require('joi');

const listSchema = Joi.object({
  cards: Joi.object({
    _id: Joi.string().uuid().required(),
    subject: Joi.string().min(2).max(80).required(),
    description: Joi.string().min(50).max(1500).required(),
    chapter: Joi.object({
      name: Joi.string().min(2).max(80).required(),
      initials: Joi.string().min(2).max(4).required()
    }).required(),
    category: Joi.object({
      name: Joi.string().min(2).max(80).required()
    }).required(),
    create_date: Joi.string().required()
  }).required(),
  total: Joi.number().required()
});

module.exports = listSchema;
