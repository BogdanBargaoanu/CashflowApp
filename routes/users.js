var express = require('express');
var router = express.Router();

/**
 * @openapi
 * /users:
 *   get:
 *     description: Gets the list of users.
 *     responses:
 *       200:
 *         description: Returns the users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 iduser:
 *                   type: int
 *                 username:
 *                  type: string
 *                 password:
 *                  type: string
 */

/* GET users listing. */
router.get('/', function (req, res, next) {
  const query = 'SELECT * FROM users';
  req.db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(result);
  });
  //res.send('respond with a resource');
});

router.post('/addUser', function (req, res, next) {
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

  if (!req.body.username || !req.body.password) {
    res.status(400).json({ error: 'The request must have an username and password!' });
    return;
  }
  if (req.body.username.length < 5) {
    res.status(400).json({ error: 'The username must have at least 5 characters!' });
    return;
  }
  
  const checkUsername = 'SELECT COUNT(idUsers) AS count FROM users WHERE username = ?';
  req.db.query(checkUsername, [req.body.username], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result[0]['count'] > 0) {
      res.status(400).json({ error: 'The username already exists!' });
      return;
    }
  });
  
  if (req.body.password.length < 5) {
    res.status(400).json({ error: 'The password must have at least 5 characters!' });
    return;
  }

  const hasUpperCase = /[A-Z]/.test(req.body.password); // regex test for uppercase
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(req.body.password); // regex test for special char
  if(!hasUpperCase || !hasSpecialChar) {
    res.status(400).json({ error: 'The password must have at least one uppercase letter and one special character!' });
    return;
  }

  req.db.query(query, [req.body.username, req.body.password], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'User added successfully!' });
  });

});

module.exports = router;
