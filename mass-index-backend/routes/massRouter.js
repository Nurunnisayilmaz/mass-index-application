const jwt = require('jsonwebtoken');
const memberData = require('../models/user.js')
const express = require('express');
const router = express.Router();

const {massIndex} = require('../controllers/massController')

function verifyToken(req, res, next) {
    const token = req.headers['authorization']
    if (typeof token !== 'undefined') {
        jwt.verify(token, 'secretkey', {}, (err, authData) => {
            if (err) {
                res.sendStatus(403)
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

router.post('/newMassIndex', verifyToken, massIndex)


module.exports = router;