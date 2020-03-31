const jwt = require('jwt-simple');
const moment = require('moment')
const { SECRET } = require('../config');

const makeToken = (user) => {
    return jwt.encode({
        user: user._id,
        expire: moment().add(7, 'days')
    }, SECRET);
};

const readToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const data = jwt.decode(token, SECRET);
            if (data.expire <= moment()) reject ({ message: 'Expired token'});
            resolve({ user: data._id });
        } catch (err) {
            reject({ message: 'Invalid token'})
        }
    });
}

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new Error('No authenticated')
        const token = req.headers.authorization.split(' ')[1];
        const data = await readToken(token);
        res.currentUser = data.user;
        next();
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

module.exports = { makeToken, readToken, auth };