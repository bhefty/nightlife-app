const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

const should = chai.should();

const getAccessToken = require('../../server/utilities/access_token')

chai.use(chaiHttp);

describe('Yelp', () => {

    // Get access token to use Yelp APIs
    before((done) => {
        getAccessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
            .then(token => access_token = token.access_token)
            .then(() => done())
            .catch((err) => console.log(err))
    })

    describe('/GET/:location Yelp', () => {
        it('should GET bars near the given location from Yelp', (done) => {
            let location = '10011'
            chai.request(server)
                .get('/yelp/' + location)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })
    })
})