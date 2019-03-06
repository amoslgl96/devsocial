const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//Create Schema

//avatar: when they register with their email, we will query the avatar server to retrieve
//the avatar. If no avatar, a placeholder image will be the substitute.

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
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model("users",UserSchema);
// or module.exports = User = mongoose.model("users", UserSchema);

