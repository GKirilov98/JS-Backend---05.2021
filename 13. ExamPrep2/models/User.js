const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type:String, required:true},
    lickedPlays: [{type: mongoose.Schema.Types.ObjectId, ref: 'Play'}]
});

module.exports = mongoose.model('User', schema);