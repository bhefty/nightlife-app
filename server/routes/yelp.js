const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');

const Bar = require('../models/bar');
const getAccessToken = require('../utilities/access_token');

// Get accessToken from Yelp to use other APIs
let access_token;
getAccessToken(config.CLIENT_ID, config.CLIENT_SECRET)
    .then(token => access_token = token.access_token)

// Restructure the bar information returned from Yelp
function mapBars(bars) {
    return new Promise((resolve, reject) => {
        if (!bars) reject({'message': 'No bars listed'})
        resolve(bars.map((bar) => {
            return {
                id: bar.id,
                name: bar.name,
                image_url: bar.image_url,
                url: bar.url,
                rating: bar.rating,
                price: bar.price,
                location: bar.location.display_address,
                phone: bar.display_phone
            }
        }))
    })
}


// GET /bars/:location route to see bars in the area
router.get('/:location', (req, res) => {
    return new Promise((resolve, reject) => {
        const location = req.params.location
        if (!location) reject({ 'message': 'No location provided' })
        const options = {
            method: 'GET',
            url: 'https://api.yelp.com/v3/businesses/search',
            qs: { term: 'bars', location: location },
            headers: {
                authorization: 'Bearer ' + access_token
            }
        }

        request(options, (error, response, body) => {
            if (error) reject(error)
            let barsList = JSON.parse(body)
            mapBars(barsList.businesses)
                .then(result => resolve(res.json(result)))
        })
    })
})

module.exports = router;