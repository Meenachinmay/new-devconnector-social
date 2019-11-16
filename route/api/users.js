const express = require('express')
const router = express.Router()
// Load User Model
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// Load Input Validation 
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')




// @route  GET api/users/test
// @desc   Test users route
// @access Public
router.get('/test', (req, res) => 
    res.json({ msg: "Users working"})
)

// @route  GET api/users/register
// @desc   Register User
// @access Public
router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body)
    
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({email: req.body.email })
            .then(user => {
            if (user){
                errors.email = "Email is already exist!!!"
                return res.status(400).json(errors)
            }else {
                // Using gravatar for image stuff
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // Size
                    r: 'pg', // Rating
                    d: 'mm' // Default
                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                })
                
                // Encrypting the UserPassword
                bcrpyt.genSalt(10, (err, salt) => {
                    bcrpyt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                    })
                })
            }
        })
})

// @route  GET api/users/login
// @desc   Login User / Returning JWT Token
// @access Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body)
    
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
    
    const email = req.body.email
    const password = req.body.password

    // Find User by email
    User.findOne({email})
        .then(user => {
            // Check for user
            if (!user){
                errors.email = "User not found!"
                return res.status(404).json(errors)
            }else{
            //Check password
                bcrpyt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch){
                            // User Matched
                            // Creating payload
                            const payload = {id: user.id, name: user.name, avatar: user.avatar }
                            // Sign Token
                            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    })
                                })//.catch(err => console.log(err))
                        }else{
                            errors.password = "Password is Incorrect!"
                            return res.status(400).json(errors)
                        }
                    })
            }
        })
})

// @route  GET api/users/current
// @desc   Return Current User
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), 
(req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router