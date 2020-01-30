const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/jwtSecret');
const bc = require('bcryptjs');
const Users = require('../../data/helpers/users-model');

// POST register
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bc.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// POST login
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
        const token = signToken(user);

        res
          .status(200)
          .json({ token, message: `Welcome back ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function signToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
