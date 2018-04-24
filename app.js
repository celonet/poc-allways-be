'use strict'

const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
// const logger = require('./commons/lib/logger')
// const redis = require('./commons/lib/redis')
const swaggerJSDoc = require('swagger-jsdoc')
const { responseNotFound } = require('./middlewares/not-found')

// const {
//   database
// } = require('./commons/lib/database')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

// app.database = database(app)
// app.database = Object.assign({}, { redis })
require('./routes')(app)

const swagger = require('./swagger.json')

const swaggerDefinition = {
  info: swagger.info,
  host: swagger.host,
  basePath: swagger.basePath,
  paths: swagger.paths,
  definitions: swagger.definitions,
  tags: swagger.tags,
  schemes: swagger.schemes
}

const options = {
  swaggerDefinition,
  apis: ['./routes.js']
}

const swaggerSpec = swaggerJSDoc(options)

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

app.use(responseNotFound)

module.exports = app