const home = require("../controllers/home-controller");
const about = require("../controllers/about-controller");
const cube = require("../controllers/cube-controller");
const notFound = require("../controllers/notFound-controller");


module.exports = (app) => {
    app.get("/", home.get);
    app.get("/about", about.get);
    app.get("/create", cube.getCreate);
    app.post("/create", cube.postCreateCube);
    app.get("/details/:id", cube.getById)

    app.get("*", notFound.get)
};