const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type:String, required:true},
    bookedHotels: [{type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'}],
    offeredHotels: [{type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'}]
});

module.exports = mongoose.model('User', schema);