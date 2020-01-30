const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/jwtSecret');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error_message: 'YOU SHALL NOT PASS, IDIOT' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ error_message: 'Yeah right... ' });
  }
};
