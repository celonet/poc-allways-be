'use strict'

const sinon = require('sinon')

const {
  formatCard,
  formatListCards
} = require('../../../../v1/formatters')

describe('Unit tests', () => {
  describe('Format Card', () => {
    const cardMock = {
      chapter: 'Chapter ID',
      category: 'Category ID',
      subject: 'Subject mock',
      description: 'Description Mock with more than 150 caracteres',
      property_invalid: 'Property dont must be here'
    }
    test('Should to return an object of the cards formatted', async () => {
      const card = formatCard(cardMock)

      expect(card).toHaveProperty('chapter', 'category', 'subject', 'description', 'created_at')
      expect(card.chapter).toEqual('Chapter ID')
      expect(card.category).toEqual('Category ID')
      expect(card.subject).toEqual('Subject mock')
      expect(card.description).toEqual('Description Mock with more than 150 caracteres')
    })
    test('Should to return an list of the cards formatted', async () => {
      const cards = formatListCards([cardMock, cardMock, cardMock, cardMock])

      expect(cards.length).toEqual(4)
      cards.forEach((card) => {
        expect(card).toHaveProperty('_id', 'chapter', 'category', 'subject', 'description', 'created_at')
      })
    })
  })
})
