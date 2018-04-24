'use strict';

const Joi = require('joi');

const findSchema = Joi.object({
  page: Joi.number().positive().required(),
  limit: Joi.number().positive().max(1000).required()
});

module.exports = findSchema;
