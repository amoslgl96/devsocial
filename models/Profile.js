const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    // profile should have a link to the user. 
    // There is the type ObjectId in mongoDB created for each user
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle:{
        type: String,
        required: true,
        max: 40
    },
    company:{
        type: String,
        
    },
    website:{
        type: String
    },
    location:{
        type: String
    },
    status:{
        type: String,
        required: true
    },
    skills:{
        // array of strings. 
        type: [String],
        required: true
    },
    bio:{
        type: String
    },
    // will trigger github api to retrieve repos
    githubusername:{
        type: String
    },

    experience:[
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String,
                required: true
            }
        }
    ],

    education:[
        {
            School: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            lfieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String,
                required: true
            }
        }
    ],

    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }

})


module.exports = Profile = mongoose.model('profile', ProfileSchema);