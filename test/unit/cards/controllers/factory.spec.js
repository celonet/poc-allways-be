'use strict'

const sinon = require('sinon')

const factory = require('../../../../v1/controllers/cards/factory')

describe('Unit tests', () => {
  describe('Factory Controllers/Cards', () => {
    const requestMock = {
      body: {},
      query: {
        limit: 1,
        page: 1,
      }
    }
    const responseMock = {
      status: () => {},
      json: () => {}
    }
    const mock = {
      adapters: {
        listCards: obj => obj,
        createCard: obj => obj
      },
      repository: {
        insert: {},
        findMany: {},
        count: {},
      },
      formatters: {
        formatCard: {},
        formatListCards: {},
        formatResponse: {}
      },
      logger: {
        info: {},
        error: {}
      },
      onError: msg => msg
    }
    test.only('Should to return an object with adapters ready to use', async () => {
      const { createCard, listCards } = factory(mock)

      expect(typeof createCard).toBe('function');
      expect(typeof listCards).toBe('function');

      const adapterCreateCard = createCard(requestMock, responseMock)
      expect(adapterCreateCard).toHaveProperty('logger', 'payload', 'repository', 'formatters', 'onSuccess', 'onError')

      const adapterListCard = listCards(requestMock, responseMock)
      expect(adapterListCard).toHaveProperty('logger', 'query', 'repository', 'formatters', 'onSuccess', 'onError')
    })
  })
})
