'use strict'

const db = require('../v1/repository/db')
const config = require('../config')

const COLLECTION_CARDS = config.db.collections.cards
const FIELDS = config.keys.fields
const URL = config.db.url

const index = async (db) => {
  try {
    const uniqueFields = FIELDS.reduce((prev, atu) => ({ ...prev, [atu]: 1 }), {})
    const optionsFields = FIELDS.reduce((prev, atu) => `${prev.split('.')[0]}_${atu.split('.')[0]}` )

    const indexes = await db.collection(COLLECTION_CARDS).indexes()
    console.log('indexes', indexes)

    const index = indexes.find(i => i.name === optionsFields.name)
    if (index) {
      console.log('index.name', index.name)
      return null
    }

    await  db.collection(COLLECTION_CARDS).createIndex(uniqueFields, { name: optionsFields, unique: true });
    console.log('create keys')

    process.exit(0)
  } catch (error) {
    console.log('create index', error)
    throw error
  }
}

const createKeys = async () => {
  try {
    await db.connect(URL)

    const cards = await db.collection(config.db.collections.cards).findOne()
    console.log('cards', cards)
    if (!cards) await db.createCollection(COLLECTION_CARDS)

    return index(db)

  } catch (error) {
    console.log('error index', error)
  } 
} 

createKeys()