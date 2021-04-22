
exports.up = function(knex) {
  return knex.shema
  .createTable('cereals', tbl => {
    tbl.increments('cereal_id');
    tbl.string('cereal_name', 128).unique().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('cereals');
};
