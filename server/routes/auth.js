const AuthenticationController = require('../controllers/authentication'),
      express = require('express'),
      passportService = require('../config/passport'),
      passport = require('passport')

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

module.exports = function(app) {
    const apiRoutes = express.Router()
    const authRoutes = express.Router()

    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes)

    authRoutes.get('/dashboard', requireAuth, (req, res) => {
        res.send('It worked! user id is: ' + req.user._id + '.')
    })

    // Registration route
    authRoutes.post('/register', AuthenticationController.register)

    // Login route
    authRoutes.post('/login', requireLogin, AuthenticationController.login)

    // Set url for API group routes
    app.use('/api', apiRoutes)
}