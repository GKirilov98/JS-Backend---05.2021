const authController = require('../controllers/auth-controller');
const homeController = require('../controllers/home-controller');
const playController = require('../controllers/play-controller');
module.exports = (app) => {
 app.use("/auth", authController);
 app.use("/", homeController);
 app.use("/theaters", playController);
};