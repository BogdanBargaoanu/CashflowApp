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

module.exports = router;