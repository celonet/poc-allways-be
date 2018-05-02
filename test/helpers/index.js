'use strict'

const request = require('supertest-as-promised')

const app = require('../../app')

const create = async ({ model, data, quantity = 1, record = {} }) => {
  if (quantity > 0) {
    try {
      record = await model.create(data[0])
    } catch (error) {
      console.log(error)
    }
    return create({ model, data: data.slice(1, data.length + 1), quantity: quantity - 1, record })
  }
  return record
}

const requestPost = async ({
  url,
  data,
}) => request(app).post(url).send(data)

const requestGet = async ({
  url,
  query,
}) => request(app).get(url).query(query)

const generateCards = card => card.map(el => ([
  { ...el, subject: 'Subject Test 1' },
  { ...el, subject: 'Subject Test 2' },
  { ...el, subject: 'Subject Test 3' },
  { ...el, subject: 'Subject Test 4' },
  { ...el, subject: 'Subject Test 5' },
  { ...el, subject: 'Subject Test 6' }]))

module.exports = {
  create,
  requestPost,
  requestGet,
  generateCards,
}
