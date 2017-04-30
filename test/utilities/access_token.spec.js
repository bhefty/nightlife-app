process.env.NODE_ENV = 'test';

const config = require('config');
const CLIENT_ID = config.CLIENT_ID
const CLIENT_SECRET = config.CLIENT_SECRET

const chai = require('chai');
const server = require('../../server');

const should = chai.should();

const getAccessToken = require('../../server/utilities/access_token');

describe('Access Token', () => {
    it('should get a token from Yelp to use in their APIs', (done) => {
        getAccessToken(CLIENT_ID, CLIENT_SECRET)
            .then((token) => {
                token.should.be.a('object');
                token.access_token.should.have.length.above(1);
            })
            .then(() => done())
            .catch((err) => console.log(err))
    })
})