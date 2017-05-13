const passport = require('passport'),
      User = require('../models/user'),
      JwtStrategy = require('passport-jwt').Strategy,
      GitHubStrategy = require('passport-github').Strategy
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local'),
      config = require('config')
      
const PASSPORT_SECRET = process.env.PASSPORT_SECRET || config.PASSPORT_SECRET
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || config.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || config.GITHUB_CLIENT_SECRET
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || config.GITHUB_CALLBACK_URL

const localOptions = { usernameField: 'email' }

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) return done(err)
        if (!user) {
            return done(null, false, { error: 'Your login details could not be verified. Please try again.' })
        }
        
        user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err)
            if (!isMatch) {
                return done(null, false, { error: 'Your login details could not be verified. Please try again.' })
            }
            return done(null, user)
        })
    })
})

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: PASSPORT_SECRET
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload._id, (err, user) => {
        if (err) return done(err, false)

        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
})

const gitHubLogin = new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
)

passport.use(jwtLogin)
passport.use(localLogin)
passport.use(gitHubLogin)