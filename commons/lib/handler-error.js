'use strict'

module.exports = response => (error) => {
  if (error.isJoi) {
    response.status(400).json({
      data: {},
      error: {
        status_code: 400,
        message: error.message,
        details: error.details
      }
    })
  }

  response.status(error.status || 500).json({
    data: {},
    error: {
      name: error.name || 'IntervalServerError',
      message: error.message || 'internal server error',
      details: error.details || [error],
      status_code: error.status || 500
    }
  })
}
