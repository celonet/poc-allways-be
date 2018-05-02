'use strict'

const models = require('../../api/models')

const helpers = require('../helpers')

const URL_GET_CARD = '/api/cards'

describe('Integration tests', () => {
  describe('List Card', () => {
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

      const fullCard = {
        subject: 'Subject Test',
        description: 'Description with more than 50 caracters, but i dont something',
        created_at: new Date().toISOString(),
        category: category._id,
        chapter: chapter._id
      }

      const listCards = helpers.generateCards([fullCard])[0]

      await helpers.create({
        model: models.Card,
        data: listCards,
        quantity: listCards.length + 1 })

    })

    test('Should to find five Cards in the first page in API', async () => {
      try {
        const { body: { data, error }, statusCode } = await
          helpers.requestGet({ url: URL_GET_CARD, query: {
            limit: 5, page: 1
          }})

        expect(data.cards.length).toEqual(5)
        expect(data.count).toEqual(6)
        expect(error).toEqual(null)
        expect(statusCode).toEqual(200)
      } catch (error) {}
    })

    test('Should to find one Card in the second page in API', async () => {
      try {
        const { body: { data, error }, statusCode } = await
          helpers.requestGet({ url: URL_GET_CARD, query: {
            limit: 5, page: 2
          }})

        expect(data.cards.length).toEqual(1)
        expect(data.count).toEqual(6)
        expect(error).toEqual(null)
        expect(statusCode).toEqual(200)
      } catch (error) {}
    })

    test('Should to find one Card filtered by subject in API', async () => {
      try {
        const { body: { data, error }, statusCode } = await
          helpers.requestGet({ url: URL_GET_CARD, query: {
            limit: 5, page: 1, subject: 'Subject Test 1'
          }})

        expect(data.cards.length).toEqual(1)
        expect(data.count).toEqual(1)
        expect(error).toEqual(null)
        expect(statusCode).toEqual(200)
      } catch (error) {}
    })

    test('Should to find five Cards filtered by description in API', async () => {
      try {
        const { body: { data, error }, statusCode } = await
          helpers.requestGet({ url: URL_GET_CARD, query: {
            limit: 5, page: 1, description: 'Description with more than 50 caracters, but i dont something'
          }})

        expect(data.cards.length).toEqual(5)
        expect(data.count).toEqual(6)
        expect(error).toEqual(null)
        expect(statusCode).toEqual(200)
      } catch (error) {}
    })

    test('Should not to find Cards filtered by subject in API', async () => {
      try {
        const { body: { data, error }, statusCode } = await
          helpers.requestGet({ url: URL_GET_CARD, query: {
            limit: 10, page: 1, subject: 'Subject not existents'
          }})

        expect(data.cards.length).toEqual(0)
        expect(data.count).toEqual(0)
        expect(error).toEqual(null)
        expect(statusCode).toEqual(200)
      } catch (error) {}
    })

    test('Should to return an error when page is not provided', async () => {
      try {
        const { body: { data, error }, statusCode } = await
          helpers.requestGet({ url: URL_GET_CARD, query: {
            limit: 5
          }})

        expect(error).toHaveProperty('status_code', 'message', 'details')
        expect(error).toHaveProperty('message', 'child "page" fails because ["page" is required]')
        expect(error.details[0]).toHaveProperty('message', '"page" is required')
        expect(data).toEqual({})
        expect(statusCode).toEqual(400)
      } catch (error) {}
    })

    test('Should to return an error when limit is not provided', async () => {
      try {
        const { body: { data, error }, statusCode } = await
          helpers.requestGet({ url: URL_GET_CARD, query: {
            page: 1
          }})

        expect(error).toHaveProperty('status_code', 'message', 'details')
        expect(error).toHaveProperty('message', 'child "limit" fails because ["limit" is required]')
        expect(error.details[0]).toHaveProperty('message', '"limit" is required')
        expect(data).toEqual({})
        expect(statusCode).toEqual(400)
      } catch (error) {}
    })
  })
})
