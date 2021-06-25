const hotel = require('../services/hotel-service')

module.exports = () => (req, res, next) => {
    req.storage = {
      ...hotel
    }

    next();
};