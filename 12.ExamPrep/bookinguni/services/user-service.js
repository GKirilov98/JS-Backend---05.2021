const User = require('../models/User')

async function createUser(userData) {
    const user = new User(userData);
    return await user.save();
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, "i");
    return User.findOne({username: {$regex: pattern}});
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, "i");
    return User.findOne({email: {$regex: pattern}});
}

async function getUserById(id) {
    let user = await User.findById(id).populate('bookedHotels');
    return user;
}

async function getAllUsers() {
    return User.find({});
}

async function insertBookedHotel(idUsername, idHotel) {
    return User.updateOne({_id: idUsername}, {
        $addToSet: {bookedHotels: idHotel}
    });
}

async function insertOfferedHotel(idUsername, idHotel) {
    return User.updateOne({_id: idUsername}, {
        $addToSet: {offeredHotels: idHotel}
    });
}


module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserById,
    getAllUsers,
    insertBookedHotel,
    insertOfferedHotel,
}