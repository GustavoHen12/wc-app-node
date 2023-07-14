/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('visitantes', table => {
    table.increments('id').primary();
    table.string('nome', 150).notNullable();
    table.string('telefone', 20).nullable();
    table.timestamp('dataHora').defaultTo(knex.fn.now()).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('visitantes');
};
