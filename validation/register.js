// Defining the rules for the validation of register form
// Creating the validation basically

const Validator = require('validator')
const isEmpty = require('./is-empty')
module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    // Name validation started
    if (!Validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = "Name must be between 2 and 30 characters"
    }

    if (Validator.isEmpty(data.name)){
        errors.name = "Name Field is required!!!"
    }

    // Email validation started
    if (Validator.isEmpty(data.email)){
        errors.email = "Email Field is required!!!"
    }

    if (!Validator.isEmail(data.email)){
        errors.email = "Email is Invalid, please try again with a valid email!"
    }

    // Password validation started
    if (Validator.isEmpty(data.password)){
        errors.password = "Password Field is required!!!"
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = "Password must be at least 6 characters!"
    }

    if (Validator.isEmpty(data.password2)){
        errors.password2 = "Confirm password Field is required!!!"
    }

    if (!Validator.equals(data.password, data.password2)){
        errors.password2 = "Password must match"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}