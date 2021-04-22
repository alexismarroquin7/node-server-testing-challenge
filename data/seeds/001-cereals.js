
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cereals').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cereals').insert([
        { cereal_name: "Cap'n Crunch" },
        { cereal_name: "Cheerios" },
        { cereal_name: 'Honey Bunches' },
        { cereal_name: "Apple Jacks" },
        { cereal_name: "Froot Loops" },
        { cereal_name: "Lucky Charms" }
      ]);
    });
};
