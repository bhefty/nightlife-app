const chai = require('chai');
const server = require('../../server');

const should = chai.should();

const getAccessToken = require('../../server/utilities/access_token');

describe('Access Token', () => {
    it('should get a token from Yelp to use in their APIs', (done) => {
        getAccessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
            .then((token) => {
                token.should.be.a('object');
                token.access_token.should.have.length.above(1);
            })
            .then(() => done())
            .catch((err) => console.log(err))
    })
})