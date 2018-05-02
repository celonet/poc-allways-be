'use strict'

const dotenv = require('dotenv')

dotenv.load()

module.exports = {
  env: process.env.NODE_ENV,
  app: {
    port: process.env.PORT
  },
  db: {
    url: process.env.DB_URL
  }
}
