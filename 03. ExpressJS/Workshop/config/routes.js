const home = require("../controllers/home-controller");
const about = require("../controllers/about-controller");
const cube = require("../controllers/cube-controller");
const notFound = require("../controllers/notFound-controller");
const accessory = require("../controllers/accessory-controller");


module.exports = (app) => {
    app.get("/", home.get);
    app.get("/about", about.get);

    app.get("/create", cube.getCreate);
    app.post("/create", cube.postCreateCube);
    app.get("/details/:id", cube.getById)

    app.get("/attach/accessory/:id", accessory.getAttach)
    app.post("/attach/accessory/:id", accessory.postAttach)
    app.get("/create/accessory", accessory.getCreate)
    app.post("/create/accessory", accessory.postCreate)

    app.get("*", notFound.get)
};