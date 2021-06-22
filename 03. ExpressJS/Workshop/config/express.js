const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const storage = require("../models/storage");

module.exports = async function (app)  {
    //Setup the view engine
    app.engine(".hbs", handlebars({
        extname: ".hbs"
    }))
    app.set("view engine", ".hbs")
    //Setup the static files
    app.use("/static", express.static("static"))
    // Setup the body parser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(await storage.init())
};