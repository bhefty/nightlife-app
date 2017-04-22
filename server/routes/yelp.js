const request = require('request')
const express = require('express')
const router = express.Router()

const getAccessToken = require('../utilities/access_token')

let access_token

getAccessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
    .then(token => {access_token = token.access_token})

mapBars = (bars) => {
    return new Promise((resolve, reject) => {
        if (!bars) {
            reject({ 'message': 'No bars listed' })
        } else {
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
        }
    })
}

router.get('/', (req, res, next) => {
    const testObject = {
        'AppName': 'Nightlife Activity',
        'Version': 1.0
    }
    res.json(testObject)
})

router.get('/:location', (req, res, next) => {
    return new Promise((resolve, reject) => {
        const location = req.params.location
        const options = {
            method: 'GET',
            url: 'https://api.yelp.com/v3/businesses/search',
            qs: { term: 'bars', location: location },
            headers: {
                'cache-control': 'no-cache',
                authorization: `Bearer ${access_token}`
            }
        }

        request(options, (error, response, body) => {
            if (error) {
                reject(error)
            } else {
                let barsList = JSON.parse(body)
                mapBars(barsList.businesses)
                    .then(result => resolve(res.json(result)))
            }
        })
    })
})

module.exports = router