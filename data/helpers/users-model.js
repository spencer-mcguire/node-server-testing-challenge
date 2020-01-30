const db = require('../dbConfig');

module.exports = {
  find,
  findBy,
  findById,
  add
};

function find() {
  return db('users').select('id', 'username');
}

function findBy(filter) {
  return db('users as u')
    .select('u.id', 'u.username', 'u.password')
    .where(filter);
}

function findById(id) {
  return db('users as u')
    .select('u.id', 'u.username')
    .where({ id })
    .first();
}

function add(data) {
  return db('users')
    .insert(data)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
