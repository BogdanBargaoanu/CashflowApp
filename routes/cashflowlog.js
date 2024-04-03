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
 *                   date:
 *                    type: string
 *                   identity:
 *                    type: string
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
    const query = `SELECT cashflowlog.idcashflowLog, entities.name, cashflowlog.type, cashflowlog.value, cashflowlog.currency, cashflowlog.description, DATE_FORMAT(cashflowlog.date, '%Y-%m-%dT%T') as date, cashflowlog.identity FROM cashflowlog
  INNER JOIN entities ON cashflowlog.idEntity = entities.idEntities
  WHERE cashflowlog.idUser = ? ORDER BY cashflowlog.date DESC;`;
    req.db.query(query, [userId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});


/**
 * @openapi
 * /cashflowlog/insertLog:
 *   post:
 *     tags:
 *      - cashflowlog
 *     description: Inserts a new cashflow log for a user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idEntity:
 *                 type: integer
 *               type:
 *                 type: string
 *               value:
 *                 type: number
 *               currency:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a success message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request. Missing required fields or value is not greater than 0.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized. No authorization header or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */

router.post('/insertLog', function (req, res, next) {
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
        res.status(401).json({ success: false, error: 'Invalid token' });
        return;
    }
    const { idEntity, type, value, currency, description, date } = req.body;
    if (!idEntity || !type || !value || !currency || !description || !date) {
        res.status(400).json({ success: false, error: 'Missing required fields' });
        return;
    }
    if (value <= 0) {
        res.status(400).json({ success: false, error: 'Value must be greater than 0' });
        return;
    }
    if (!dateRegex.test(date)) {
        res.status(400).json({ success: false, error: 'Invalid date format.' });
        return;
    }

    const query = `INSERT INTO cashflowlog (idUser, idEntity, type, value, currency, description, date) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    req.db.query(query, [userId, idEntity, type, value, currency, description, mysqlDate], (err, result) => {
        if (err) {
            res.status(500).json({ success: false, error: err.message });
            return;
        }
        res.json({ success: true, message: 'Cashflow log inserted successfully' });
    });
});
module.exports = router;