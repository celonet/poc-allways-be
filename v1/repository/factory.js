'use strict'

module.exports = ({ model }) => ({
  insertMany(...obj) {
    return model.create([...obj])
  },
  insert(obj) {
    return model.create(obj)
  },
  findMany({ query = {}, page = 1, limit = 10 } = {}) {
    return model
      .find(query)
      .limit(limit)
      .skip((page - 1) * limit)
  },
  findById(id) {
    return model.findById(id)
  },
  updateMany(query, obj) {
    return model.update(query, { $set: { obj } })
  },
  updateOne(id, obj) {
    return model.update({ _id: id }, obj)
  },
  destroy(query) {
    return model.remove(query)
  },
  count(query) {
    return model.find(query).count()
  },
})
