'use strict'

const mongoose = require('mongoose')

const {
  formatCard,
  formatListCards
} = require('../../api/formatters')

describe('Unit tests', () => {
  describe('Format Card', () => {
    const cardMock = {
      _id: mongoose.Types.ObjectId(),
      chapter: {
        _id: mongoose.Types.ObjectId(),
        name: 'Chapter ID',
        initials: "CID"
      },
      category: {
        _id: mongoose.Types.ObjectId(),
        name: 'Category ID',
      },
      subject: 'Subject mock',
      description: 'Description Mock with more than 150 caracteres',
      property_invalid: 'Property dont must be here',
      created_at: new Date()
    }
    test('Should to return an object of the cards formatted', async () => {
      const card = formatCard(cardMock)

      expect(card).toHaveProperty('chapter', 'category', 'subject', 'description', 'created_at')
      expect(card.chapter).toHaveProperty('name','Chapter ID')
      expect(card.chapter).toHaveProperty('initials','CID')
      expect(card.category.name).toEqual('Category ID')
      expect(card.subject).toEqual('Subject mock')
      expect(card.description).toEqual('Description Mock with more than 150 caracteres')
    })

    test('Should to return a list of the cards formatted', async () => {
      const cards = formatListCards([cardMock, cardMock, cardMock, cardMock])

      expect(cards.length).toEqual(4)
      cards.forEach((card) => {
        expect(card).toHaveProperty('_id', 'chapter', 'category', 'subject', 'description', 'created_at')
      })
    })
  })
})
