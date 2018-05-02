'use strict'

const {
  payloadValidation,
  responseValidation,
  paramsValidation,
} = require('./commons/lib/validate-schema')

const {
  createCardSchema,
  listCardsSchema,
  findCardsSchema
} = require('./api/schemas')

const { cardFactory } = require('./api/controllers')

module.exports = (app) => {
  const {
    createCard,
    listCards
  } = cardFactory

  app.post('/api/cards',
    payloadValidation(createCardSchema),
    createCard
  )

  app.get('/api/cards',
    paramsValidation(findCardsSchema),
    listCards,
    responseValidation(listCardsSchema)
  )
}
