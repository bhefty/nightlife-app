const jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      User = require('../models/user'),
      config = require('config')

const PASSPORT_SECRET = process.env.PASSPORT_SECRET || config.PASSPORT_SECRET

function generateToken(user) {
    return jwt.sign(user, PASSPORT_SECRET, {
        expiresIn: 10080
    })
}

function setUserInfo(request) {
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
    }
}

// Save Location
exports.saveLocation = (req, res, next) => {
    const location = req.body.location

    if (!location) {
        return res.status(422).send({ error: 'You must provide a location' })
    }

    User.findByIdAndUpdate(
        { _id: req.user._id },
        { $set: { 'profile.lastLocation': location } },
        { new: true },
        (err, user) => {
            if (err) return next(err)

            res.status(200).json({ user: user.profile })
        }
    )
}

// Add Bar Route
exports.addBar = (req, res, next) => {
    const barId = req.body.id

    if (!barId) {
        return res.status(422).send({ error: 'You must provide a bar id' })
    }

    User.findByIdAndUpdate(
       { _id: req.user._id },
       { $push: {'profile.barsAttending': { bar_id: barId }} },
       { new: true },
       (err, user) => {
           if (err) return next(err)

           res.status(200).json({ user: user.profile })
       }
    )
}

// Remove Bar Route
exports.removeBar = (req, res, next) => {
    const barId = req.body.id

    if (!barId) {
        return res.status(422).send({ error: 'You must provide a bar id' })
    }

    User.findByIdAndUpdate(
       { _id: req.user._id },
       { $pull: {'profile.barsAttending': { bar_id: barId }} },
       { new: true },
       (err, user) => {
           if (err) return next(err)

           res.status(200).json({ user: user.profile })
       }
    )
}

// Login Route
exports.login = function(req, res, next) {
    let userInfo = setUserInfo(req.user)

    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    })
}

// Registration Route
exports.register = function(req, res, next) {
    // Check for registration errors
    const email = req.body.email
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const password = req.body.password

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.' })
    }

    // Return error if full name not provided
    if (!firstName || !lastName) {
        return res.status(422).send({ error: 'You must enter your full name.' })
    }

    // Return error if no email provided
    if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' })
    }

    User.findOne({ email: email }, (err, existingUser) => {
        if (err) return next(err)

        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use.' })
        }

        // If email is unique and password was provided, create account
        let user = new User({
            email,
            password,
            profile: { firstName, lastName}
        })

        user.save((err, user) => {
            if (err) return next(err)

            // Respond with JWT if user was created
            let userInfo = setUserInfo(user)
            
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
        })
    })
}