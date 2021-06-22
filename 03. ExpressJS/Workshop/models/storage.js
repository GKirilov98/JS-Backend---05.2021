const fs = require("fs/promises");
const uniqid = require("uniqid");
let data = []

async function init() {
    try {
        data = JSON.parse(await fs.readFile('./config/database.json'));
    } catch (err) {
        console.error("Error reading database!");
        console.error(err);
    }

    return (req, res, next) => {
        req.storage = {
            getAll, getById, insert
        }

        next();
    }
}

async function getAll(query) {
    let assign = Object.assign(data);

    if (query.search){
        assign = assign.filter( c => c.name.toLowerCase().includes(query.search.toLowerCase()))
    }

    if (query.from){
        assign = assign.filter(c=> c.difficultyLevel >= Number(query.from))
    }

    if (query.to){
        assign = assign.filter(c=> c.difficultyLevel <= Number(query.to))
    }

    return assign;
}

async function getById(id) {
     let filtered = data.filter((value => value.id === id));
     if (filtered.length > 0) {
         return Object.assign(filtered[0]) ;
     } else {
         return null;
     }
}

async function insert(cube) {
    cube.id = uniqid();
    data[data.length ] = cube;

    try {
       await fs.writeFile('./config/database.json', JSON.stringify(data));
    } catch (err) {
        console.error("Error while insert data");
        console.error(err);
    }

}

const storage = {
    init, getAll, getById, insert
}

module.exports = storage;