// Update with your config settings.
require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'postgresql',
  connection: {
    database: 'wecareapp',
    user:     process.env.DB_USER,
    password: process.env.DB_PWD,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
