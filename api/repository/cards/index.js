'use strict';

const factory = require('../factory');

module.exports = ({ model }) => ({
  ...factory({ model }),
  findMany({ query = {}, page = 1, limit = 10 } = {}) {
    return model
      .find(query)
      .populate('chapter')
      .populate('category')
      .limit(limit)
      .skip((page - 1) * limit);
  },
  findById(id) {
    return model
      .findById(id)
      .populate('chapter')
      .populate('category');
  },
});
