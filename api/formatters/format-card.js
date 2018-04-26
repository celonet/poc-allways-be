'use strict'

exports.formatListCards = cards => cards.map(card => ({
  _id: card._id,
  chapter: card.chapter,
  category: card.category,
  subject: card.subject,
  description: card.description,
  created_at: card.created_at
}))

exports.formatCard = data => ({
  chapter: data.chapter,
  category: data.category,
  subject: data.subject,
  description: data.description,
  created_at: new Date().toISOString()
})
