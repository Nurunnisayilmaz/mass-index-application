const memberData = require('../models/user.js')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const {email, password} = req.body;

    memberData.find({email, password}).then(result => {
        if (result.length === 0) {
            res.status(500).json({message: "Member not found."});
        } else {
            const user = {id: result[0]._id.toString(), email, name: result[0].name, surname: result[0].surname};
            jwt.sign({user: user}, 'secretkey', {}, (err, token) => {
                res.json({
                    token
                })
            })
        }
    }).catch(err => {
        res.status(500).json({message: err.message});
    })
})


router.post('/register', (req, res) => {
    const {email, password, name, surname, height, weight} = req.body;

    massIndexValue = weight / ((height / 100) * (height / 100));

    memberData.find({email}).then(result => {
        if (result.length === 0) {
            const data = new memberData({
                email,
                password,
                name,
                surname,
                massData: [{date: new Date(), height, weight, massIndexValue}]
            });

            data.save().then(() => {
                res.json({message: "ok"})
            }).catch(err => {
                res.status(500).json({message: err.message});
            })
        } else {
            res.status(500).json({message: "Email already used!"});
        }
    }).catch(err => {
        res.status(500).json({message: err.message});
    });

})

module.exports = router;