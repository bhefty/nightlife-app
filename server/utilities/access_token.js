const request = require("request");

const getAccessToken = (CLIENT_ID, CLIENT_SECRET) => {
    return new Promise((resolve, reject) => {
        const options = { 
            method: 'POST',
            url: 'https://api.yelp.com/oauth2/token',
            headers: { 
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache' 
            },
            form: { 
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'client_credentials' 
            } 
        };

        request(options, function (error, response, body) {
            if (error) {
                reject(error)
            }

            resolve(JSON.parse(body))
        });
    })
}

module.exports = getAccessToken