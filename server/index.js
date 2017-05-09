const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('config');

const yelp = require('./routes/yelp')
const bars = require('./routes/bars')
const auth = require('./routes/auth')

const app = express();
const PORT = process.env.PORT || 5000;

// DB connection
const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

const MONGO_URI = process.env.MONGO_URI || config.MONGO_URI

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// do not show log when in test mode
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined'))
}

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

// parse application/json and look for raw test
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json({type: 'application/json'}))
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use('/yelp', yelp)
app.use('/bars', bars)
app.use('/auth', auth)

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;