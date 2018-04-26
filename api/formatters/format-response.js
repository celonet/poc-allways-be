'use strict'

exports.formatResponse = ({ message = '', statusCode = 200 }) => ({
  message,
  status_code: statusCode
})
