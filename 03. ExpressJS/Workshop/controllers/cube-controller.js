const storage = require("../models/storage");
const Cube = require("../models/Cube");


function getCreate(req, res) {
    res.render("create")
}

async function postCreateCube(req, res) {
   await new Cube ({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficultyLevel: req.body.difficultyLevel
    }).save();


    res.redirect("/")
}

async function getById(req, res) {
    const id = req.params.id;
    const cube = await Cube.findById(id).populate('accessories');
    const ctx = {
        tittle: "Details",
        cube: cube
    }
    res.render("details", ctx);
}


const cube = {
    getCreate,
    getById,
    postCreateCube
}

module.exports = cube;
