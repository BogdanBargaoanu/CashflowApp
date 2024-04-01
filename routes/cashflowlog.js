var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

/**
 * @openapi
 * /cashflowlog:
 *   get:
 *     tags:
 *      - cashflowlog
 *     description: Gets the list of cashflow logs for a user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the cashflow logs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idcashflowLog:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   value:
 *                     type: number
 *                   currency:
 *                     type: string
 *                   description:
 *                     type: string
 *       401:
 *         description: Unauthorized. No authorization header or invalid token.
 *       500:
 *         description: Server error.
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.get('/', function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: 'No authorization header' });
        return;
    }

    const token = authHeader.split(' ')[1]; // get the token from the Authorization header
    let userId;
    try {
        const decoded = jwt.verify(token, 'cashflow-key'); // verify the token
        userId = decoded.id; // get the user ID from the decoded token
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
        return;
    }
    const query = `SELECT cashflowlog.idcashflowLog, entities.name, cashflowlog.type, cashflowlog.value, cashflowlog.currency, cashflowlog.description, cashflowlog.date FROM cashflowlog
  INNER JOIN entities ON cashflowlog.idEntity = entities.idEntities
  WHERE cashflowlog.idUser = ?`;
    req.db.query(query, [userId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

module.exports = router;