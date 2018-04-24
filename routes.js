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
} = require('./v1/schemas')

const { cardFactory } = require('./v1/controllers')

module.exports = (app) => {
  const {
    createCard,
    listCards
  } = cardFactory

  app.post('/v1/card',
    payloadValidation(createCardSchema),
    createCard
  )

  app.get('/v1/cards',
    paramsValidation(findCardsSchema),
    listCards,
    responseValidation(listCardsSchema)
  )
}
