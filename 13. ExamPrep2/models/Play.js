const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type:String, required:true, maxlength: 50},
    imageUrl: {type:String, required:true},
    isPublic: {type:Boolean, default: false},
    createdAt: {type:String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    usersLiked: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Play', schema);