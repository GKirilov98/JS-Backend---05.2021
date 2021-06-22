const storage = require("../models/storage");

function getCreate(req, res) {
    res.render("create")
}

async function postCreateCube(req, res) {
    let cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficultyLevel: req.body.difficultyLevel
    }

    await storage.insert(cube);
    res.redirect("/")
}

async function getById(req, res) {
    const id = req.params.id;
    const cube = await storage.getById(id);
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
