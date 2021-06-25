const Hotel = require('../models/Hotel')
const userService = require('./user-service')

async function insertOneHotel(hotelData) {
    const hotel = new Hotel(hotelData)
    let saved = await hotel.save();
    await userService.insertOfferedHotel(hotelData.owner, saved._id)
    return saved;
}

async function getAllHotels() {
    const hotels = await Hotel.find({}).lean();

    return hotels;
}

async function getHotelById(id) {
    return Hotel.findById(id).lean();

    // return hotel;
}

async function insertBookedByUser(idHotel, idUsername) {
    let isBooked = (await Hotel.findById(idHotel).lean()).bookedBy.filter(e => e == idUsername).length >= 1;
    if (isBooked) {
        throw new Error("This user already booked this hotel")
    }

  let hotel =  await Hotel.updateOne({_id: idHotel}, {
        $addToSet: {bookedBy: idUsername}
    });

   await userService.insertBookedHotel(idUsername, idHotel);

   return hotel;
}

async function editHotel(idHotel, idUser, hotelData) {
    let hotel = await Hotel.findById(idHotel).lean();
    let isOwner = hotel.owner == idUser;
    if (!isOwner) {
        throw new Error("Only owner can update/delete hotel!");
    }

    return Hotel.updateOne({_id: idHotel},
        hotelData)
}

async function deleteHotel(idHotel, idUser) {
    let hotel = await Hotel.findById(idHotel).lean();
    let isOwner = hotel.owner == idUser;
    if (!isOwner) {
        throw new Error("Only owner can update/delete hotel!");
    }

   return   Hotel.deleteOne({_id: idHotel})
}

module.exports = {
    insertOneHotel,
    getAllHotels,
    getHotelById,
    insertBookedByUser,
    editHotel,
    deleteHotel
}