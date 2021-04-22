const db = require('../../data/db-config');

const findAll = () => {
  return db('cereals');
}

const findBy = filter => {
  return db('cereals').where(filter).orderBy('cereal_id', 'asc');
}

const findById = cereal_id => {
  return db('cereals').where({ cereal_id }).first();
}

const create = async cereal => {
  const [ cereal_id ] = await db('cereals').insert(cereal);
  return findById(cereal_id);
}

const update = async (cereal_id, changes) => {
  await db('cereals').update(changes).where({ cereal_id });
  return findById(cereal_id);
}

const remove = async cereal_id => {
  const deletedCereal = await findById(cereal_id);
  await db('cereals').where({ cereal_id }).delete();
  return deletedCereal;
}

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove
}