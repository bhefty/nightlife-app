const request = require('request')
const express = require('express')
const router = express.Router()

const getAccessToken = require('../utilities/access_token')
const DB = require('../utilities/db')

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

router.post('/attendance', (req, res, next) => {
    return new Promise((resolve, reject) => {
        const attendanceObject = {
            bar_id: req.query.id,
            value: parseInt(req.query.value)
        }
        
        if (!attendanceObject.bar_id || !attendanceObject.value) {
            reject('Error: Missing query information for bar ID and whether attending is true or false.')
        } else {
            let database = new DB
            
            database.connect(process.env.MONGO_URI)
                .then(() => database.updateDocument('bars', attendanceObject))
                .then(() => {
                    // database.close()
                    database.findDocuments('bars')
                        .then(docs => resolve(res.json(docs)))
                })
                .catch(err => console.log('Failed to update the document: ' + err))
        }
    })
})

// router.post('/countDocs', (req, res, next) => {
//     let requestBody = req.body
//     let database = new DB

//     database.connect(process.env.MONGO_URI)
//         .then(() => database.countDocuments('active_bars'))
//         .then((count) => {
//                 return {
//                     'success': true,
//                     'count': count,
//                     'error': ''
//                 }
//             }, (err) => {
//                 console.log('Failed to count the documents: ' + err)
//                 return {
//                     'success': false,
//                     'count': 0,
//                     'error': 'Failed to count the documents: ' + err
//                 }
//             }
//         )
//         .then((resultObject) => {
//             // database.close()
//             res.json(resultObject)
//         })
// })

module.exports = router