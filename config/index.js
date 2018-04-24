'use strict'

const defaultConfig = require('./default')

const ENV = process.env.NODE_ENV
const currentEnvironmentConfig = require(`./${ENV}`)

module.exports = Object.assign({}, defaultConfig, currentEnvironmentConfig)