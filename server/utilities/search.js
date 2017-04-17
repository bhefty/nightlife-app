const request = require('request')

const getBarsByLocation = (ACCESS_TOKEN, location) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            url: 'https://api.yelp.com/v3/businesses/search',
            qs: { term: 'bars', location: location },
            headers: {
                'cache-control': 'no-cache',
                authorization: `Bearer ${ACCESS_TOKEN}`
            } 
        }

        request(options, (error, response, body) => {
            if (error) {
                reject(error)
            }

            resolve(JSON.parse(body))
        })
    })
}

module.exports = getBarsByLocation