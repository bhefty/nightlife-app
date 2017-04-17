require('dotenv').config()

const express = require('express');
const path = require('path');

const getAccessToken = require('./utilities/access_token')
const getBarsByLocation = require('./utilities/search.js')

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));


getAccessToken(process.env.CLIENT_ID,process.env.CLIENT_SECRET)
  .then((result) => {
    const ACCESS_TOKEN = result.access_token
    getBarsByLocation(ACCESS_TOKEN, '79416')
      .then((results) => console.log(results))
  })
  .catch(error => console.error(error))

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
