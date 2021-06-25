const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 4},
    city: {type: String, required: true, minlength: 3},
    imageUrl: {type: String, required: true, match: /^(http:|https:).+$/i},
    rooms: {type: Number, required: true, min: 1, max: 100},
    bookedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Hotel', schema);