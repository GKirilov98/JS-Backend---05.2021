const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const mongoose = require("mongoose");
module.exports =  (app) => {
    return new Promise(((resolve, reject) => {
        //This is fo config mongoose;
        mongoose.connect(config.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = mongoose.connection;
        db.on("error", (err) => {
            console.log("Connection error: ", err) ;
            reject(err);
        });
        db.once("open", function () {
            console.log("Database ready");
            resolve();
        });
    }))

}