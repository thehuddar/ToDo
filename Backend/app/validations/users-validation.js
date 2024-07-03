const User = require("../models/users-model")

const userRegisterValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: 'username field is required'
        },
        isLength: {
            options: { min: 3, max: 30 },
            errorMessage: 'username must be between 3 to 30 characters'
        }
    },
    email: {
        notEmpty: {
            errorMessage: "email field is required"
        },
        trim: true,
        normalizeEmail: true,
        custom: {
            options: async function (val) {
                const user = await User.findOne({ email: val })
                if (!user) {
                    return true
                } else {
                    throw new Error('email already exists')
                }
            }
        }
    },
    password: {
        notEmpty: {
            errorMessage: "password field is required"
        },
        isLength: {
            options: { min: 8, max: 128 },
            errorMessage: 'password must be between 8-128 characters'
        }
    },
    dateofbirth: {
        notEmpty: {
            errorMessage: "date of birth is required"
        },
        custom: {
            options: function (val) {
                const diff = Number(new Date().getFullYear()) - val.slice(0, 4)
                if (diff > 10) {
                    return true
                } else {
                    throw new Error("user must be atleast 10 years old")
                }
            }
        }
    },
    gender: {
        notEmpty: {
            errorMessage: 'gender is required'
        },
        isIn: {
            options: [['male', 'female', 'other']],
            errorMessage: 'field must be either male, female or other'
        }
    }
}

const userLoginValidationSchema = {
    email:{
        notEmpty:{
            errorMessage:'email field is required'
        },
        isEmail:{
            errorMessage:'email must be in valid format'
        }
    },
    password:{
        notEmpty:{
            errorMessage:'password field is required'
        },
        isLength:{
            options:{min : 8, max:128},
            errorMessage:'password must be between 8-128 characters'
        }
    }
}

module.exports = {
    userRegisterValidationSchema,
    userLoginValidationSchema
}