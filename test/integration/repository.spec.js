'use strict'

const repository = require('../../api/repository/factory')
const Card = require('../../api/models/cards')

describe('Integration tests', () => {
  describe('Repository', () => {
    const card = repository({ model: Card })
    const cardMock = {
      subject: 'Subject Test',
      description: 'Description with more than 50 caracters, but i dont something',
      created_at: new Date().toISOString()
    }
    beforeAll(async () => {
      await Card.remove({})
    })

    test('Should to create one data in the database', async () => {
      const record = await card.insert(cardMock)

      expect(record).toHaveProperty('_id')
      expect(record).toHaveProperty('subject', cardMock.subject)
      expect(record).toHaveProperty('description', cardMock.description)
      expect(record).toHaveProperty('created_at')
    })

    test('Should to update one data in the database when query and options is not provided', async () => {
      const recordUpdated = await card.updateOne({
        data: { subject: 'Subject Test updated whtiout query' } })

      expect(recordUpdated).toHaveProperty('n', 1)
      expect(recordUpdated).toHaveProperty('nModified', 1)
      expect(recordUpdated).toHaveProperty('ok', 1)
    })

    test('Should to update one data in the database', async () => {
      const [record, ...data] = await card.findMany({ 'subject': cardMock.subject })

      const recordUpdated = await card.updateOne({
        query: { _id: record._id },
        data: { subject: 'Subject Test updated' },
        options: { new: true } })

      expect(recordUpdated).toHaveProperty('n', 1)
      expect(recordUpdated).toHaveProperty('nModified', 1)
      expect(recordUpdated).toHaveProperty('ok', 1)
    })

    test('Should not to update one data in the database when params is not provided', async () => {
      const recordUpdated = await card.updateOne()

      expect(recordUpdated).toHaveProperty('n', 0)
      expect(recordUpdated).toHaveProperty('nModified', 0)
      expect(recordUpdated).toHaveProperty('ok', 0)
    })

    test('Should to find one data in the database by _id', async () => {
      const [record, ...data] = await card.findMany({ 'subject': cardMock.subject })

      const result = await card.findById(record._id)
      expect(result).toHaveProperty('subject', 'Subject Test updated')
    })

    test('Should to find all (one) data in the database when query is null', async () => {
      const [record] = await card.findMany()

      expect(record).toHaveProperty('subject', 'Subject Test updated')
      expect(record).toHaveProperty('description', 'Description with more than 50 caracters, but i dont something')
    })

    test('Should to count the number of data in the database', async () => {
      expect(await card.count()).toEqual(1)
      expect(await card.count({ subject: 'Subject Test updated' })).toEqual(1)
      expect(await card.count({ subject: 'Subject Test updated Error' })).toEqual(0)
    })

    test('Should to delete one data in the database', async () => {
      const [record, ...data] = await card.findMany({ 'subject': cardMock.subject })

      const recordDeleted = await card.destroy({ _id: record._id })
      expect(recordDeleted).toHaveProperty('n', 1)
      expect(recordDeleted).toHaveProperty('ok', 1)
    })

    test('Should to create three data in the database', async () => {
      const records = await card.insertMany(
        { ...cardMock, subject: 'Subject 1' },
        { ...cardMock, subject: 'Subject 2' },
        { ...cardMock, subject: 'Subject 3' })

      expect(records.length).toEqual(3)
      records.forEach((record, index) => {
        expect(record).toHaveProperty('subject', `Subject ${index + 1}`)
        expect(record).toHaveProperty('description', cardMock.description)
        expect(record).toHaveProperty('created_at')
      });
    })

    test('Should to update three data in the database', async () => {
      const recordsUpdated = await card.updateMany({
        query: { description: cardMock.description } ,
        data: { updated_at: new Date().toISOString() } })

      expect(recordsUpdated).toHaveProperty('n', 3)
      expect(recordsUpdated).toHaveProperty('nModified', 3)
      expect(recordsUpdated).toHaveProperty('ok', 1)
    })

    test('Should to find three data in the database by description', async () => {
      const results = await card.findMany({ description: cardMock.description })

      expect(results.length).toEqual(3)
      results.forEach(result => {
        expect(result).toHaveProperty('updated_at')
      })
    })

    test('Should to find all (three) data in the database when query is null', async () => {
      const [record1, record2, record3] = await card.findMany()

      expect(record1).toHaveProperty('subject', 'description', 'chapter', 'category')
      expect(record2).toHaveProperty('subject', 'description', 'chapter', 'category')
      expect(record3).toHaveProperty('subject', 'description', 'chapter', 'category')
    })

    test('Should to count number of data in the database by pagination', async () => {
      const [pageOne] = await card.findMany({ query: {}, page: 1, limit: 1, sort: { subject: 1 } })
      const [pageTwo] = await card.findMany({ query: {}, page: 2, limit: 1, sort: { subject: 1 } })
      const [pageThree] = await card.findMany({ query: {}, page: 3, limit: 1, sort: { subject: 1 } })

      expect(pageOne).toHaveProperty('subject', 'Subject 1')
      expect(pageTwo).toHaveProperty('subject', 'Subject 2')
      expect(pageThree).toHaveProperty('subject', 'Subject 3')

      const pageNotFound = await card.findMany({ query: {}, page: 4, limit: 1, sort: { subject: 1 } })
      expect(pageNotFound.length).toEqual(0)
    })

    test('Should to count number of data in the database', async () => {
      expect(await card.count({ description: cardMock.description })).toEqual(3)
      expect(await card.count({ subject: ' ' })).toEqual(0)
    })

    test('Should not to update three data in the database when params is not provided', async () => {
      const recordsUpdated = await card.updateMany()

      expect(recordsUpdated).toHaveProperty('n', 0)
      expect(recordsUpdated).toHaveProperty('nModified', 0)
      expect(recordsUpdated).toHaveProperty('ok', 0)
    })

    test('Should not to update one data in the database when params is not provided', async () => {
      const recordUpdated = await card.updateOne()

      expect(recordUpdated).toHaveProperty('n', 0)
      expect(recordUpdated).toHaveProperty('nModified', 0)
      expect(recordUpdated).toHaveProperty('ok', 0)
    })

    test('Should to delete all data in the database', async () => {
      const recordDeleted = await card.destroy()

      expect(recordDeleted).toHaveProperty('n', 3)
      expect(recordDeleted).toHaveProperty('ok', 1)
    })
  })
})
