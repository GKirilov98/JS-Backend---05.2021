const Accessory = require("../models/Accessory")
const Cube = require("../models/Cube")

function getCreate(req, res) {
    res.render("accessory-create")
}

async function postCreate(req, res) {
    await new Accessory({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
    }).save();

    res.redirect("/")
}

async function getAttach(req, res) {
    let idCube = req.params.id;
    let currCube = await Cube.findById(idCube);
    let accessoryArray = await Accessory.find({});
    let notIncluded = [];
    for (let index in accessoryArray) {
        if (!currCube.accessories.includes(accessoryArray[index].id)) {
            notIncluded[notIncluded.length] = accessoryArray[index]
        }
    }

    let ctx = {
        cube: currCube,
        accessories: notIncluded
    }

    res.render("accessory-attached", ctx)
}

async function postAttach(req, res) {
    let idAccessory = req.body.accessory;
    let idCube = req.params.id;
    let neCube = await Cube.updateOne({_id: idCube}, {
        $addToSet: {accessories: idAccessory}
    });

    if (neCube){
        await Accessory.updateOne({_id: idAccessory}, {
            $addToSet: {cubes: idCube}
        })
    }

    res.redirect("/details/" + idCube);
}


const accessory = {
    getCreate,
    postCreate,
    getAttach,
    postAttach
}

module.exports = accessory;