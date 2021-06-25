const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const authMiddleware = require('../middlewares/auth')
const storageMiddleware = require('../middlewares/storage')

module.exports = async function (app) {
    //Setup the view engine
    app.engine(".hbs", handlebars({
        extname: ".hbs"
    }));
    app.set("view engine", ".hbs");
    //Setup the static files
    app.use("/static", express.static("static"));
    // Setup the body parser
    app.use(bodyParser.urlencoded({extended: false}));
    //Setup cookie
    app.use(cookieParser());

    app.use(authMiddleware());
    app.use(storageMiddleware());

    app.use((req, res,next) => {
        if (req.url.includes("favicon"))
        console.log(">>>", req.method, req.url);

        if (req.user){
            console.log("Known user", req.user.username);
        }

        next();
    })
};