
exports.up = function (knex) {
    return knex.schema.alterTable("users", (table) => {
      table.string("cover");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropColumn("cover");
  };