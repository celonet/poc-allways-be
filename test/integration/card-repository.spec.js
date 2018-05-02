'use strict'

const cardRepository = require('../../api/repository/cards')
const models = require('../../api/models')

const helpers = require('../helpers')

describe('Integration tests', () => {
  describe('Card Repository', () => {
    const card = cardRepository({ model: models.Card })
    const cardMock = {
      subject: 'Subject Test',
      description: 'Description with more than 50 caracters, but i dont something',
      created_at: new Date().toISOString()
    }
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
        ...cardMock,
        category: category._id,
        chapter: chapter._id
      }

      const listCards = helpers.generateCards([fullCard])[0]

      await helpers.create({
        model: models.Card,
        data: listCards,
        quantity: listCards.length + 1 })
    })

    test('Should to find one Card in the database by _id', async () => {
      const [record, ...data] = await card.findMany()

      const result = await card.findById(record._id)
      expect(result).toHaveProperty('subject', 'Subject Test 1')
      expect(result.chapter).toHaveProperty('name', 'Chapter Test')
      expect(result.chapter).toHaveProperty('initials', 'CT')
      expect(result.category).toHaveProperty('name', 'Category Test')
    })

    test('Should to find all Cards in the database by description', async () => {
      const results = await card.findMany({ description: cardMock.description })
      expect(results.length).toEqual(6)
      results.forEach((result, index) => {
        expect(result).toHaveProperty('subject', `Subject Test ${index + 1}`)
        expect(result.chapter).toHaveProperty('name', 'Chapter Test')
        expect(result.chapter).toHaveProperty('initials', 'CT')
        expect(result.category).toHaveProperty('name', 'Category Test')
      })
    })

    test('Should to count number of Cards in the database by pagination', async () => {
      const [pageOne] = await card.findMany({ query: {}, page: 1, limit: 1, sort: { subject: 1 } })
      const [pageTwo] = await card.findMany({ query: {}, page: 2, limit: 1, sort: { subject: 1 } })
      const [pageThree] = await card.findMany({ query: {}, page: 3, limit: 1, sort: { subject: 1 } })

      expect(pageOne).toHaveProperty('subject', 'Subject Test 1')
      expect(pageTwo).toHaveProperty('subject', 'Subject Test 2')
      expect(pageThree).toHaveProperty('subject', 'Subject Test 3')

      const pageNotFound = await card.findMany({ query: {}, page: 7, limit: 1, sort: { subject: 1 } })
      expect(pageNotFound.length).toEqual(0)
    })
  })
})
