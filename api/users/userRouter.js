const router = require('express').Router();
const Users = require('../../data/helpers/users-model');
const restricted = require('../auth/restrictedMiddleware');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      if (users.length > 0) {
        res.json(users);
      } else {
        res.status(400).json({ error_message: 'No users found.' });
      }
    })
    .catch(error => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(500).json({ error_message: 'Something went wrong' });
      }
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: 'Could not find scheme with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete scheme' });
    });
});

module.exports = router;
