'use strict'

const moment = require('moment')

const COLORS = {
  RED: '\x1b[31m',
  MAGENTA: '\x1b[35m',
  BLUE: '\x1b[34m',
  WHITE: '\x1b[37m'
}

const getDate = () => moment().format('MMMM Do YYYY, h:mm:ss a')

const validateArg = arg => typeof arg === 'object'

const validateObjects = (...objs) => 
  objs.map(obj => 
    validateArg(obj) ? ` ${JSON.stringify(obj)}` : ` ${obj}`)

module.exports = {
  info: (...args) => {
    console.log(`${COLORS.WHITE}`, `${getDate()} ${validateObjects(args)}`)
  },
  warn: (...args) => {
    console.log(`${COLORS.BLUE}`, `${getDate()} ${validateObjects(args)}`)
  },
  error: (...args) => {
    console.log(`${COLORS.RED}`, `${getDate()} ${validateObjects(args)}`)
  }
}
