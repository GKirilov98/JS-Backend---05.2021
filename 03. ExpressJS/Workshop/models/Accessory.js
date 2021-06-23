const mongoose = require("mongoose");
const collectionName = "accessory";

const schema = new mongoose.Schema({
    name : { type: String, required: true},
    imageUrl : { type: String, required: true},
    description : { type: String, required:true, maxlength: 50},
    cubes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'cube' }]

});

schema.path("imageUrl")
.validate(function (){
    return this.imageUrl.startsWith("http") || this.imageUrl.startsWith("https")
});

module.exports = mongoose.model(collectionName, schema);