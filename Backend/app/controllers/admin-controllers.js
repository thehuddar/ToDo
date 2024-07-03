const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require("../models/users-model")
const adminCntrl = {}

adminCntrl.login = (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        returnres.status(400).json({errors:errors.array()})
    }
    const body = req.body
    if (process.env.EMAIL == body.email && process.env.PASSWORD == body.password) {
        const tokenData = {
            id: process.env.ID,
            role:process.env.ROLE
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET)
        res.json({
            admin:'admin loggedin',
            token: token
        })
    } else {
        res.status(401).json({
            notify: 'Invalid email/password'
        })
    }
}

adminCntrl.userlists = async(req,res)=>{
    try{
        const users = await User.find().select(['username','email','dateofbirth','createdAt'])
        res.status(200).json(users)
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports = adminCntrl