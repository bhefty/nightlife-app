const AuthenticationController = require('../controllers/authentication'),
      express = require('express'),
      router = express.Router(),
      passportService = require('../config/passport'),
      passport = require('passport')

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

router.get('/test', (req, res) => {
    res.json({ data: 'worked' })
})

router.get('/dashboard', requireAuth, (req, res) => {
    res.json({ user_id: req.user._id, profile: req.user.profile })
})

 // Registration route
router.post('/register', AuthenticationController.register)

// Login route
router.post('/login', requireLogin, AuthenticationController.login)

// Add bar to user profile
router.post('/addbar', requireAuth, AuthenticationController.addBar)

// Remove bar from user profile
router.post('/removebar', requireAuth, AuthenticationController.removeBar)

// Save location to user profile
router.post('/savelocation', requireAuth, AuthenticationController.saveLocation)


module.exports = router