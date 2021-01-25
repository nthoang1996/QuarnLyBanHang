const db = require('../utils/db');

module.exports = {
    getByUsername:async (username) =>  await db.load(`select * from S2_USER where ID = '${username}'`)
}