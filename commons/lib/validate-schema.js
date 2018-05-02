'use strict'

const Joi = require('joi')

const payloadValidation = schema => (request, response, next) => {
  const { error } = Joi.validate(request.body, schema)

  return next(error)
}

const paramsValidation = schema => (request, response, next) => {
  const { error, value } = Joi.validate(request.query, schema)
  if (error) return next(error)

  request.query = value
  return next()
}

const headersValidation = schema => (request, response, next) => {
  const { error } = Joi.validate(request.headers, schema)

  return next(error)
}

const responseValidation = schema => (request, response, next) => {
  const { error } = Joi.validate(response.data, schema)

  if (error) return next(error)

  return response
    .status(response.statusCode || 200)
    .json({ data: response.data, error: null })
    .end()
}

module.exports = {
  payloadValidation,
  paramsValidation,
  headersValidation,
  responseValidation
}
