// require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config =require('config');

const yelp = require('./routes/yelp')
const bars = require('./routes/bars')

const app = express();
const PORT = process.env.PORT || 5000;

// DB connection
const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URI, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// do not show log when in test mode
console.log(config.util.getEnv('NODE_ENV'))
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined'))
}

// parse application/json and look for raw test
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json({type: 'application/json'}))
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use('/yelp', yelp)
app.use('/bars', bars)

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;