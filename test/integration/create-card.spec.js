'use strict'

const models = require('../../api/models')
const app = require('../../app')

const helpers = require('../helpers')

const URL_POST_CARD = '/api/cards'

let card = {
  subject: 'Subject Test',
  description: 'Description with more than 50 caracters, but i dont something',
}

describe('Integration tests', () => {
  describe('Create Card', () => {
    beforeAll(async () => {
      await models.Card.remove({})
      await models.Category.remove({})
      await models.Chapter.remove({})

      const category = await helpers.create({
        model: models.Category,
        data: [{ name: 'Category Test' }] })

      const chapter = await helpers.create({
        model: models.Chapter,
        data: [{ name: 'Chapter Test', initials: 'CT' }] })

      card = {
        ...card,
        category: category._id,
        chapter: chapter._id
      }

    })
    test('Should to create one Card in API', async () => {
      try {
        const { body: { data, error }, statusCode } = await
          helpers.requestPost({ url: URL_POST_CARD, data: card })

        expect(data).toEqual({})
        expect(error).toEqual(null)
        expect(statusCode).toEqual(201)
      } catch (error) {}
    })

    test('Should to return an error when description is equal a spaces', async () => {
      try {
        const { body: { data, error }, statusCode } = await
          helpers.requestPost({ url: URL_POST_CARD, data: { ...card, description: '' } })

        expect(data).toEqual({})
        expect(error).toHaveProperty('status_code', 400)
        expect(error).toHaveProperty('message', 'child "description" fails because ["description" is not allowed to be empty]')
        expect(error.details[0]).toHaveProperty('message', '"description" is not allowed to be empty')
        expect(statusCode).toEqual(400)

      } catch (error) {}
    })
  })
})
