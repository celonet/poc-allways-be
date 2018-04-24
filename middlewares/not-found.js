'use strict';

exports.responseNotFound = (req, res, next) => { 
  res.status(404)
    .json({ message: 'Endpoint not found' })
    .end();
}