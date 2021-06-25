const authController = require('../controllers/auth-controller');
const homeController = require('../controllers/home-controller');
const hotelController = require('../controllers/hotel-controller');
const userController = require('../controllers/user-controller');
module.exports = (app) => {
 app.use("/auth", authController);
 app.use("/", homeController);
 app.use("/hotels", hotelController);
 app.use("/user", userController);
};