// Load prod or test env variables
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' })
} else {
  require('dotenv').config()
}

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const yelp = require('./routes/yelp')
const bars = require('./routes/bars')

const app = express();
const PORT = process.env.PORT || 5000;

// DB connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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