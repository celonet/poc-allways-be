'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const listSchema = Joi.object({
  cards: Joi.array().items(Joi.object({
    _id: Joi.string().required(),
    subject: Joi.string().min(2).max(80).required(),
    description: Joi.string().min(50).max(1500).required(),
    chapter: Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().min(2).max(80).required(),
      initials: Joi.string().min(2).max(4).required()
    }).required(),
    category: Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().min(2).max(80).required()
    }).required(),
    created_at: Joi.string().required(),
    updated_at: Joi.string().optional()
  })).allow([]).required(),
  count: Joi.number().required()
});

module.exports = listSchema;
