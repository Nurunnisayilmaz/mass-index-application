const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const massDataSchema = new Schema({
    date: {type: Date, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    massIndexValue: {type: Number, required: true}
}, {timestamps: false});

module.exports = mongoose.model('massDataSchema', massDataSchema);