'use strict'

const mongoose = require('mongoose')

const { db: { url } } = require('../../config')

const connect = async () => {
  await mongoose.connect(url)
};

const disconnect = async () => {
  await mongoose.connection.close();
};

beforeAll(() => {
  connect()
});
afterAll(() => {
  disconnect()
});
