const db = require('../utils/db');

module.exports = {
    all: async () =>  await db.load('select * from D3_ITEM ')
}