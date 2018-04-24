'use strict'

const Joi = require('joi')

exports.payloadValidation = schema => (request, response, next) => {
  const { error } = Joi.validate(request.body, schema)

  next(error)
}

exports.paramsValidation = schema => (request, response, next) => {
  const { error } = Joi.validate(request.query, schema)

  next(error)
}

exports.headersValidation = schema => (request, response, next) => {
  const { error } = Joi.validate(request.headers, schema)

  next(error)
}

exports.responseValidation = schema => (request, response, next) => {
  const { error } = Joi.validate(response.data, schema)

  next(error)
}