const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const UserModel1 = mongoose.model("users", UserSchema)
module.exports = UserModel1