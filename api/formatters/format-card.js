'use strict'

exports.formatListCards = cards => cards.map(card => ({
  _id: card._id.toString(),
  chapter: {
    _id: card.chapter._id.toString(),
    name: card.chapter.name,
    initials: card.chapter.initials,
  },
  category: {
    _id: card.category._id.toString(),
    name: card.category.name
  },
  subject: card.subject,
  description: card.description,
  created_at: card.created_at.toISOString()
}))

exports.formatCard = data => ({
  chapter: data.chapter,
  category: data.category,
  subject: data.subject,
  description: data.description,
  created_at: new Date().toISOString()
})
