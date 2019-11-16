const Validator = require('validator')
const isEmpty = require('./is-empty')
module.exports = function validateLoginInput(data) {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    // Email validation started
    
    if (!Validator.isEmail(data.email)){
        errors.email = "Email is Invalid, please try again with a valid email!"
    }
    
    if (Validator.isEmpty(data.email)){
        errors.email = "Email Field is required!!!"
    }
    
    // Password validation started
    if (Validator.isEmpty(data.password)){
        errors.password = "Password Field is required!!!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}