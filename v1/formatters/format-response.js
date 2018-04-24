'use strict'

exports.formatCreated = ({ message = '', statusCode = 200 }) => ({
  message,
  status_code: statusCode
})
