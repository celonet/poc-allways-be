'use strict'

const sinon = require('sinon')

const list = require('../../api/adapters/cards/list')

const listStub = require('./../stub/list-cards-stub.json')

const clone = obj => Object.assign({}, obj)

describe('Unit tests', () => {
  const mocks = {
    logger: { info: () => {}, error: () => {} },
    repository: {
      findMany: async () => listStub,
      count: async () => 10
    },
    formatters: {
      formatListCards: cards => cards,
    },
    params: {
      query: {
        limit: 10,
        page: 1,
      }
    },
    onSuccess: obj => obj,
    onError: err => ({
      name: err.name || 'IntervalServerError',
      message: err.message || 'internal server error',
      details: err.details || [err],
      status_code: err.status || 400
    })
  }

  describe('List of Cards', () => {
    test('Should to create an Card with success', async () => {
      const mock = clone(mocks)

      mock.logger.info = sinon.spy()

      const { cards, total } = await list(mock)

      expect(mock.logger.info.called).toEqual(true)
      expect(mock.logger.info.calledOnce).toEqual(true)

      expect(cards.length).toEqual(5)
      expect(total).toEqual(10)

      cards.forEach((card, index) => {
        expect(card._id).toEqual('UUID')
        expect(card.chapter.name).toEqual('nome do capitulo')
        expect(card.chapter.initials).toEqual('NC')
        expect(card.category.name).toEqual('Nome da categoria')
        expect(card.subject).toEqual(`Assunto ${index+1}`)
        expect(card.description).toEqual('descrição com mais de 50 caracteres não sei porque, mas deve ter tudo isso ')
      });
    })

    test('Should to return an error, Invalid Object Card', async () => {
      const mock = clone(mocks)

      mock.repository.findMany = () => Promise.reject(new Error('Invalid object of cards'))

      mock.logger.info = sinon.spy()
      mock.logger.error = sinon.spy()

      const response = await list(mock)

      expect(mock.logger.info.called).toEqual(true)
      expect(mock.logger.info.calledOnce).toEqual(true)
      expect(mock.logger.error.calledOnce).toEqual(true)

      expect(response).toHaveProperty('status_code', 'name', 'message', 'details')
      expect(response.status_code).toEqual(400)
      expect(response.message).toEqual('Invalid object of cards')
    })
  })
})
