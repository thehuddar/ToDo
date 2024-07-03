const {model, Schema} = require("mongoose")

const userSchema = new Schema({
    username:String,
    email:String,
    password:String,
    dateofbirth:Date,
    gender:String,
    role:String,
    isVerified:{
        type:String,
        default:'false'
    },
    otp:Number
},{timestamps:true})

const User = model('user', userSchema)

module.exports = User;