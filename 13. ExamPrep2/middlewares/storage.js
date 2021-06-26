const play = require('../services/play-service')

module.exports = () => (req, res, next) => {
    req.storage = {
      ...play
    }

    next();
};