
exports.up = function(knex) {
  return knex.schema.createTable("modules", table => {
      table.increments("id").primary();
      table.integer("course").unsigned().notNullable();
      table.foreign("course").references("id").inTable("courses");
      table.string("name").notNullable();
      table.string("description");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("modules");
};
