import * as Knex from 'knex'

/**
 * Initialize the knex connection
 *
 * @returns {object} knex The knex object
 */
function initKnex() {
  const knexConfig = this.resolve('config').knex

  // enable foreign keys for sqlite
  if (knexConfig.client === 'sqlite3') {
    if (!knexConfig.pool) {
      knexConfig.pool = {}
    }
    knexConfig.pool.afterCreate = (conn, cb) => {
      conn.run('PRAGMA foreign_keys = ON', cb)
    }
  }

  // Initialize knex.
  const knex = new Knex(knexConfig)

  return knex
}

export default initKnex
