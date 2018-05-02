'use strict'

module.exports = ({ model }) => ({
  insertMany(...obj) {
    return model.create([...obj])
  },
  insert(obj) {
    return model.create(obj)
  },
  findMany({ query = {}, page = 1, limit = 10, sort = {} } = {}) {
    return model
      .find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sort)
  },
  findById(id) {
    return model.findById(id)
  },
  updateMany({ query = {}, data = {}, options = { new: true, multi: true } } = {}) {
    return model.update(query, data, options)
  },
  updateOne({ query = {}, data = {}, options = { new: false } } = {}) {
    return model.update(query, data, options)
  },
  destroy(query = {}) {
    return model.remove(query)
  },
  count(query = {}) {
    return model.find(query).count()
  },
})
