const express = require('express');
const app = express()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const port = 3000

app.use(express.json())


mongoose.connect('mongodb://localhost:27017/member');

const massDataSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    massIndexValue: {type: Number, required: true}
}, {timestamps: false});

const memberData = mongoose.model('memberData', new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: Number, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    massData: [massDataSchema]
}, {timestamps: true}));


app.post('/register', (req, res) => {
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

app.post('/newMassIndex', verifyToken, (req, res) => {
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

app.post('/login', (req, res) => {
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})