const storage = require("../models/storage");

async function get(req, res) {
    const ctx = {
        title: "Home",
        cubes: await storage.getAll(req.query),
        query: req.query
    };


    res.render("index.hbs", ctx);
}

const home = {
    get
}

module.exports = home;
