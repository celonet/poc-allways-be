'use strict';

const Joi = require('joi');

const findSchema = Joi.object({
  page: Joi.number().positive().required(),
  limit: Joi.number().positive().max(1000).required(),
  sort: Joi.object({}).optional(),
  subject: Joi.string().max(80).optional(),
  description: Joi.string().max(1500).optional(),
  category: Joi.string().optional(),
  chapter: Joi.string().optional(),
});

module.exports = findSchema;
