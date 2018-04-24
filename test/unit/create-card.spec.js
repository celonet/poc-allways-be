'use strict'

const sinon = require('sinon')

const create = require('../../v1/adapters/cards/create')

const createStub = require('./stub/create-card-stub.json')

const clone = obj => Object.assign({}, obj)

describe('Unit tests', () => {
  const mocks = {
    logger: { info: () => {}, error: () => {} },
    repository: {
      insert: async (card) => {
        if (card.subject === 'ERROR') {
          const error = new Error('Invalid Card')
          error.name = 'InvalidaCardError'

          throw error
        }
        return '';
      }
    },
    formatters: {
      formatCard: createStub => createStub,
      formatCreated: () => ({
        status_code: 201,
        message: 'Card created with success'
      })
    },
    payload: createStub,
    onSuccess: msg => msg,
    onError: err => ({
      name: err.name || 'IntervalServerError',
      message: err.message || 'internal server error',
      details: err.details || [err],
      status_code: err.status || 400
    })
  }

  describe('Create an Card', () => {
    test('Should to create an Card with success', async () => {
      const mock = clone(mocks)

      mock.logger.info = sinon.spy()

      const response = await create(mock)

      expect(mock.logger.info.called).toEqual(true)
      expect(mock.logger.info.calledOnce).toEqual(true)

      expect(response.status_code).toEqual(201)
      expect(response.message).toEqual('Card created with success')
    })

    test('Should to return an error, Invalid Card', async () => {
      const mock = clone(mocks)

      const payload = { ...createStub, subject: 'ERROR' }

      mock.logger.info = sinon.spy()
      mock.logger.error = sinon.spy()

      const response = await create({ ...mock, payload })

      expect(mock.logger.info.called).toEqual(true)
      expect(mock.logger.info.calledOnce).toEqual(true)
      expect(mock.logger.error.calledOnce).toEqual(true)

      expect(response).toHaveProperty('status_code', 'name', 'message', 'details')
      expect(response.status_code).toEqual(400)
      expect(response.name).toEqual('InvalidaCardError')
      expect(response.message).toEqual('Invalid Card')
    })
  })
})
