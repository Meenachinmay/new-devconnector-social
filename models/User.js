const mongoose = require('mongoose')

// Schema ref to create model sturcture of User collection ('User' => Table)
const Schema = mongoose.Schema

// Create Schema (The structure of the User table in mongodb database)
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users', UserSchema)