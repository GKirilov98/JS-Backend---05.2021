const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const storage = require("../models/storage");
const Cube = require("../models/Cube");
const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/cubeWorksop"

async function configMongoose() {
    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = async function (app) {
    //Setup the view engine
    app.engine(".hbs", handlebars({
        extname: ".hbs"
    }))
    app.set("view engine", ".hbs")
    //Setup the static files
    app.use("/static", express.static("static"))
    // Setup the body parser
    app.use(bodyParser.urlencoded({extended: false}));

    //This is for local files
    // app.use(await storage.init())

    //This is fo config mongoose;
    await configMongoose()
};