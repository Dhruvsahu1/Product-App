const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({
    userName :{
        type : String,
        required : true,
        unique : true
    },
    email :{
        type : String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength: [6,'Email must be at least of 6 characters'],
        maxLength: [54,'Email must not  be longer more than  54 characters'],
    },
    password :{
        type : String,
        required : true,
        minLength: [6,'password must be at least of 6 digits'],

    },
    role :{
        type : String,
        default : 'user'
    }
})

const User  = mongoose.model('User',userSchema);

module.exports = User;