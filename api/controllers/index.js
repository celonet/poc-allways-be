'use strict';

// const factory = require('./cards/factory');
const { Card } = require('../models');
const { cardRepository } = require('../repository');

const formatters = require('../formatters');
const adapters = require('../adapters');

const defaultDependencies = {
  logger: require('../../commons/lib/logger'),
  onError: require('../../commons/lib/handler-error')
};

const cardFactory = require('./cards/factory')({
  ...defaultDependencies,
  repository: cardRepository({ model: Card }),
  formatters,
  adapters,
})

module.exports = { cardFactory }
