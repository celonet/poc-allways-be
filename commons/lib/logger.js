'use strict'

const moment = require('moment')

const { env } = require('../../config')

const COLORS = {
  RED: '\x1b[31m',
  MAGENTA: '\x1b[35m',
  BLUE: '\x1b[34m',
  WHITE: '\x1b[37m'
}

const getDate = () => moment().format('MMMM Do YYYY, h:mm:ss a')

const logger = {
  info: (...args) => {
    console.log(`${COLORS.WHITE}`, `${getDate()} ${JSON.stringify(args)}`)
  },
  warn: (...args) => {
    console.log(`${COLORS.BLUE}`, `${getDate()} ${JSON.stringify(args)}`)
  },
  error: (...args) => {
    console.log(`${COLORS.RED}`, `${getDate()} ${JSON.stringify(args)}`)
  }
}

module.exports = (env !== 'test') ? (logger) : { info: () => {}, warn: () => {}, error: () => {} }
