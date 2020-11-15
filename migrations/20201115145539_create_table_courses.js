exports.up = function (knex) {
    return knex.schema.createTable("courses", (table) => {
      table.increments("id").primary();
      table.string("name").notNull();
      table.text("description", 100000);
      table.string("image");
      table.string("value");
      table.integer("teacher").unsigned().notNullable();
      table.foreign("teacher").references("id").inTable("users");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("courses");
  };