'use strict'

const {
  formatResponse
} = require('../../api/formatters')

describe('Unit tests', () => {
  describe('Format Response', () => {
    const responseMock = {
      message: 'Message mock ok',
      statusCode: 201,
    }
    test('Should to return an object with message and status_code = 201 when status_code is provided', async () => {
      const response = formatResponse(responseMock)

      expect(response.message).toEqual('Message mock ok')
      expect(response.status_code).toEqual(201)
    })
    test('Should to return an object with message and status_code = 200 when status_code is not provided', async () => {
      const response = formatResponse({ message: 'Other message mock to success' })

      expect(response.message).toEqual('Other message mock to success')
      expect(response.status_code).toEqual(200)
    })
    test('Should to return an object with message equal spaces and status_code = 201 when messasge is not provided', async () => {
      const response = formatResponse({ statusCode: 201 })

      expect(response.message).toEqual('')
      expect(response.status_code).toEqual(201)
    })
  })
})
