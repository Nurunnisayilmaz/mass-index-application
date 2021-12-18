const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const massDataSchema = require('./mass').schema


const memberData = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: Number, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    massData: [{ type: Schema.Types.ObjectId, ref: 'massDataSchema' }],
}, {timestamps: true})

module.exports = mongoose.model('memberData', memberData);