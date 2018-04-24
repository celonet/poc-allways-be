'use strict';

const Joi = require('joi');

const createSchema = Joi.object({
  subject: Joi.string().min(2).max(80).required(),
  description: Joi.string().min(50).max(1500).required(),
  chapter: Joi.string().max(25).required(),
  category: Joi.array().items(Joi.string()).required()
});

module.exports = createSchema;
