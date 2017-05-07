const AuthenticationController = require('../controllers/authentication'),
      express = require('express'),
      router = express.Router(),
      passportService = require('../config/passport'),
      passport = require('passport')

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

router.get('/dashboard', requireAuth, (req, res) => {
    res.send('It worked! user id is: ' + req.user._id + '.')
})

 // Registration route
router.post('/register', AuthenticationController.register)

    // Login route
router.post('/login', requireLogin, AuthenticationController.login)

module.exports = router