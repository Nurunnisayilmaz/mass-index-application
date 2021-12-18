const jwt = require('jsonwebtoken');
const memberData = require('../models/user.js')
const express = require('express');
const router = express.Router();

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


router.post('/newMassIndex', verifyToken, (req, res) => {
    const {height, weight, date} = req.body;
    massIndexValue = weight / ((height / 100) * (height / 100));

    memberData.findById(req.authData.user.id).then(result => {
        if (!result) {
            res.status(500).json({message: "Member not found."});
        } else {
            const user = result;
            user.massData.push({
                date: moment(date, "DD-MM-YYYY").toDate(),
                height,
                weight,
                massIndexValue
            });

            user.save().then(result => {
                res.json(result.massData)
            }).catch(err => {
                res.status(500).json({message: err.message});
            })

        }
    }).catch(err => {
        res.status(500).json({message: err.message});
    })

})

module.exports = router;