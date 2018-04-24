'use strict';

const { MongoClient } = require('mongodb');

const sleep = milliseconds =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

const createGetCollection = state => (collectionName) => {
  if (state.connected) return state.db.collection(collectionName);
  throw new Error('There is no connection to the database.');
};

const factory = (state, logger = console, client = MongoClient) => ({
  connect(url) {
    return client.connect(url, {
      promiseLibrary: Promise,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      autoReconnect: true,
    })
    .then((client) => {
      const db = client.db();
      db.on('close', () => {
        logger.warn(`Database connection close at ${(new Date()).toISOString()}`);
        state.connected = false;
      });

      db.on('reconnect', () => {
        state.connected = true;
        logger.info(`Database reconnected at ${(new Date()).toISOString()}`);
      });
      state.db = db;
      state.connected = true;
      return db;
    })
    .catch((err) => {
      if (err.name.startsWith('Mongo')) {
        logger.error(`Mongo network error try reconnect in 1 sec - ${err.message}`);
        return sleep(1000).then(() => factory(state).connect(url));
      }

      return Promise.reject(err);
    });
  },

  disconnect() {
    return state.db.close().then(() => { state.db = null; });
  },

  createCollection(collection) {
    try {
      return state.db.createCollection(collection)
    } catch (error) {
      throw error
    }

  },

  collection: createGetCollection(state),

  get db() { return state.db; },

  factory,
});

module.exports = factory;
