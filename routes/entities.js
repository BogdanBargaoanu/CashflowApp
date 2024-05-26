var express = require('express');
var router = express.Router();

/**
 * @openapi
 * /entities:
 *   get:
 *     tags:
 *      - entities
 *     description: Gets the list of entities.
 *     responses:
 *       200:
 *         description: Returns the entities.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idEntities:
 *                   type: integer
 *                 isUser:
 *                  type: tinyint
 *                 name:
 *                  type: string
 */

router.get('/', function (req, res, next) {
    const query = `SELECT * FROM entities`;
    req.db.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

/**
 * @openapi
 * /entities/addEntity:
 *   post:
 *     tags:
 *      - entities
 *     description: Add an entity.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the entity.
 *     responses:
 *       200:
 *         description: Entity updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error caused by an inappropriate input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * */

router.post('/addEntity', function (req, res, next) {
    const insertQuery = 'INSERT INTO entities (name, isUser) VALUES (?, ?)';
    const checkName = 'SELECT COUNT(idEntities) AS count FROM entities WHERE name = ?';
  
    if (!req.body.name || !req.body.isUser) {
      res.status(400).json({ error: 'The request has missing information!' });
      return;
    }
    if (req.body.name.length < 5) {
      res.status(400).json({ error: 'The name must have at least 5 characters!' });
      return;
    }
    if (req.body.name.length > 100) {
      res.status(400).json({ error: 'The name must have at most 100 characters!' });
      return;
    }
    req.db.beginTransaction((err) => {
  
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      req.db.query(checkName, [req.body.name], (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if (result[0]['count'] > 0) {
          res.status(400).json({ error: 'The entity already exists!' });
          return;
        }
  
        req.db.query(insertQuery, [req.body.name, req.body.isUser], (err, result) => {
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
            res.json({ message: 'Entity added successfully!' });
          });
        });
      });
    });
  });

/**
 * @openapi
 * /entities/updateEntity:
 *   post:
 *     tags:
 *      - entities
 *     description: Update an entity.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the entity.
 *               isUser:
 *                 type: boolean
 *                 description: Status if the entity is an user.
 *     responses:
 *       200:
 *         description: Entity added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error caused by an inappropriate input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * */

router.post('/updateEntity', function (req, res, next) {
    const updateQuery = 'UPDATE entities SET name = ? WHERE idEntities = ?';
    const checkName = 'SELECT COUNT(idEntities) AS count FROM entities WHERE name = ?';
  
    if (!req.body.name || !req.body.idEntities) {
      res.status(400).json({ error: 'The request has missing information!' });
      return;
    }
    if (req.body.name.length < 5) {
      res.status(400).json({ error: 'The name must have at least 5 characters!' });
      return;
    }
    if (req.body.name.length > 100) {
      res.status(400).json({ error: 'The name must have at most 100 characters!' });
      return;
    }
    req.db.beginTransaction((err) => {
  
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      req.db.query(checkName, [req.body.name], (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if (result[0]['count'] > 0) {
          res.status(400).json({ error: 'The entity already exists!' });
          return;
        }
  
        req.db.query(updateQuery, [req.body.name, req.body.idEntities], (err, result) => {
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
            res.json({ message: 'Entity updated successfully!' });
          });
        });
      });
    });
  });


module.exports = router;