'use strict'

const dotenv = require('dotenv')

dotenv.load()

module.exports = {
  app: {
    port: process.env.PORT
  },
  db: {
    url: process.env.DB_URL
  }
}
