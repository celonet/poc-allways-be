'use strict'

const mongoose = require('mongoose');
const app = require('./app')
const logger = require('./commons/lib/logger')
const config = require('./config')


mongoose.connect(config.db.url)
  .then(() => {
    app.listen(config.app.port, () => {
      logger.info(`Application is running on port`, config.app.port)
    })
  })