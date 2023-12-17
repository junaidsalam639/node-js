const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    image : { type : String , required : true },
    fname : { type : String , required : true },
    lname : { type : String , required : true },
    course : { type : String , required : true },
    password : { type : String , required : true },
    email : { type : String , required : true , unique : true},
    number : { type : String , required : true },
})


const userModel = mongoose.model('addusers' , userSchema);

module.exports = userModel


