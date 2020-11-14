const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

require('dotenv').config();
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id,callback)
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username}
    User.findOne(query, callback)
}

module.exports.addUser = function(newUser, callback) {
    let hashrate = Number(process.env.HASH)
    bcrypt.genSalt(hashrate, (err,salt) => {

        bcrypt.hash(newUser.password, salt, (err,hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}