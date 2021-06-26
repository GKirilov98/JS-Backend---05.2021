const Play = require('../models/Play')

async function insertOnePlay(data){
    let query = await Play.find({title: data.title});
    if (query.length > 0) {
        throw new Error("There is already play with this title!")
    }

    data.createdAt = new Date( Date.now());

   return  await new Play(data).save();
}


async function findPlayById(id){
    return  Play.findById(id).populate('usersLiked').lean();
}

async function findAllPlay(){
    return  Play.find({}).lean();
}


async function addLikedUserToPlay(idPlay, idUsername) {
    return Play.updateOne({_id: idPlay}, {
        $addToSet: {usersLiked: idUsername}
    });
}


module.exports = {
    insertOnePlay,
    findPlayById,
    findAllPlay,
    addLikedUserToPlay
}