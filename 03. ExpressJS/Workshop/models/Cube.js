const mongoose = require("mongoose");
const collectionName = "Cube";

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true, maxlength: 50},
    imageUrl: {type: String, required: true, },
    difficultyLevel: {type: Number, required: true, min: 1, max: 6},
    accessories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'accessory' }]
});
schema.path("imageUrl")
    .validate(function (){
        return this.imageUrl.startsWith("http") || this.imageUrl.startsWith("https")
    });

module.exports = mongoose.model(collectionName, schema);