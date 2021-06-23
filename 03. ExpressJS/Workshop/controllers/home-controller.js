const Cube = require('../models/Cube')

async function get(req, res) {
    let regexName = req.query.search ?  new RegExp(req.query.search,"i") : new RegExp(".*","i")
    let gte = req.query.from || 1;
    let lte = req.query.to || 6;
    let cubes = await Cube.find({
        name: regexName,
        difficultyLevel:{
            $gte:gte,
            $lte:lte,
        }
    });
    const ctx = {
        title: "Home",
        cubes: cubes,
        query: req.query
    };

    res.render("index.hbs", ctx);
}

const home = {
    get
}

module.exports = home;
