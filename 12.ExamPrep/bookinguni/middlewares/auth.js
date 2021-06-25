const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = require('../services/user-service')

module.exports = () => (req, res, next) => {
    if (parseToken(req, res)) {
        req.auth = {
            async register(userData) {
                await register(userData);
                // res.cookie(config.COOKIE_NAME, token);
            },
            async login(username, password) {
                const token = await login(username, password);
                res.cookie(config.COOKIE_NAME, token);
            },
            logout() {
                res.clearCookie(config.COOKIE_NAME);
            },
            async getUserById (idUser){
              return   userService.getUserById(idUser);
            }
        }
        next();
    }
}


async function register(userData) {
    const existUsername = await userService.getUserByUsername(userData.username);
    if (existUsername) {
        throw new Error("Username is already taken.");
    }

    const existEmail = await userService.getUserByEmail(userData.email);
    if (existEmail) {
        throw new Error("Email is already in use.");
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    await userService.createUser(userData);

    // return generateToken(user);
}

async function login(username, password) {
    const user = await userService.getUserByUsername(username);
    if (!user) {
        throw new Error("Invalid username or password!");
    }

    const hasMatch = await bcrypt.compare(password, user.password);
    if (!hasMatch) {
        throw new Error("Invalid username or password!");
    }

    return generateToken(user)
}

function generateToken(userData) {
    return jwt.sign({
        _id: userData._id,
        username: userData.username,
        email: userData.email
    }, config.TOKEN_SECRET);
}

function parseToken(req, res) {
    const token = req.cookies[config.COOKIE_NAME];
    if (token) {
        try {
            const userData = jwt.verify(token, config.TOKEN_SECRET);
            req.user = userData
            res.locals.user = userData;
        } catch (err) {
            res.clearCookie(config.COOKIE_NAME);
            res.redirect('/auth/login');
            return false;
        }
    }

    return true


}

