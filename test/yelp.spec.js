const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

const getAccessToken = require('../server/utilities/access_token')

chai.use(chaiHttp);

describe('Yelp', () => {
    let access_token;

    before((done) => {
        getAccessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
            .then(token => access_token = token.access_token)
            .then(() => done())
            .catch((err) => console.log(err))
    })

    describe('/GET api info', () => {
        it('should GET api information', (done) => {
            chai.request(server)
                .get('/yelp')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('AppName').eql('Nightlife Activity')
                done();
                })
        })
    })

    describe('/GET bars', () => {
        it('should GET bars in area based upon location', (done) => {
            chai.request(server)
                .get('/yelp/79416')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done()
                })
        })
    })

    
})