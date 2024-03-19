var express = require('express');
var router = express.Router();

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *      - users
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

/**
 * @openapi
 * /users/addUser:
 *   post:
 *     tags:
 *      - users
 *     description: Add a user.
 *     responses:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *       200:
 *         description: User added successfuly.
 *         content:
 *           json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error caused by an inappropriate input.
 *         content:
 *           json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * */

router.post('/addUser', function (req, res, next) {
  const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
  const checkUsername = 'SELECT COUNT(idUsers) AS count FROM users WHERE username = ?';

  if (!req.body.username || !req.body.password) {
    res.status(400).json({ error: 'The request must have an username and password!' });
    return;
  }
  if (req.body.username.length < 5) {
    res.status(400).json({ error: 'The username must have at least 5 characters!' });
    return;
  }
  if (req.body.password.length < 5) {
    res.status(400).json({ error: 'The password must have at least 5 characters!' });
    return;
  }

  const hasUpperCase = /[A-Z]/.test(req.body.password); // regex test for uppercase
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(req.body.password); // regex test for special char
  if (!hasUpperCase || !hasSpecialChar) {
    res.status(400).json({ error: 'The password must have at least one uppercase letter and one special character!' });
    return;
  }

  req.db.beginTransaction((err) => {

    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    req.db.query(checkUsername, [req.body.username], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result[0]['count'] > 0) {
        res.status(400).json({ error: 'The username already exists!' });
        return;
      }

      req.db.query(insertQuery, [req.body.username, req.body.password], (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        req.db.commit((err) => {
          if (err) {
            return req.db.rollback(() => {
              res.status(500).json({ error: err.message });
            });
          }
          res.json({ message: 'User added successfully!' });
        });
      });
    });
  });
});
module.exports = router;