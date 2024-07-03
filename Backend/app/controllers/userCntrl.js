const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const User = require('../models/users-model')
const { validationResult } = require('express-validator')
const nodemailer = require("nodemailer")
const otpgenerator = require('otp-generator')
const _ = require("lodash")
const userCntrl = {}
require('dotenv').config()

const OTP_LENGTH = 6
const OTP_CONFIG = {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
}
const generateOTP = () => {
    const otp = otpgenerator.generate(OTP_LENGTH, OTP_CONFIG)
    return otp
}


const sendMail = (userMail, otp) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });


    const html = `
<p><b>Hi <br/> Thankyou for registering to TaskManagement,</b><br />Your otp ${otp}</p>
` 
    async function mailSend() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USERNAME, // sender address
            to: userMail, // list of receivers
            subject: "Registration Confirmation", // Subject line
            html: html, // html body
        });
    }
    mailSend().catch(console.error)
}



userCntrl.register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const body = req.body
        const user = new User(body)
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(user.password, salt)
        user.password = encryptedPassword
        {
            const otp = generateOTP()
            user.otp = otp
            sendMail(user.email, user.otp)
        }
        user.role = 'user'
        await user.save()
        res.status(201).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


userCntrl.verifyEmail = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, otp } = _.pick(req.body, ['email', 'otp'])
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ error: 'record not found' })
        }
        if (user && user.otp != otp) {
            return res.status(400).json({ error: 'Invalid OTP' })
        }
        await User.findOneAndUpdate({ email: email }, { $set: { isVerified: true } }, { new: true })
        res.send('Email Verified')
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

userCntrl.usersLogin = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {body} = req
        const user = await User.findOne({email:body.email})
        if(!user){
            return res.status(401).json({error:'Invalid Email/Password'})
        }
        const checkPassword = await bcryptjs.compare(body.password, user.password)
        if(!checkPassword){
            return res.status(401).json({error:'Invalid Email/Password'})
        }
        const tokenData = {
            id:user._id,
            role:user.role
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:'7d'})
        res.status(200).json({
            token:token,
            user:'user loggedin'
        })
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}

module.exports = userCntrl