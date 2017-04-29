process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Bar = require('../../server/models/bar')

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Bars', () => {

    // Empty the DB
    beforeEach((done) => {
        Bar.remove({}, (err) => {
            done();
        })
    })

    describe('/GET / Bars', () => {
        it('should retrieve all bars in DB', (done) => {
            let bar1 = new Bar({ bar_id: 'the-loft-lubbock-2', numAttendees: 1 })
            let bar2 = new Bar({ bar_id: 'cuddlekins', numAttendees: 12 })
            let bar3 = new Bar({ bar_id: 'pauls-pad', numAttendees: 3 })
            Bar.create([bar1, bar2, bar3], (err, bars) => {
                chai.request(server)
                    .get('/bars/')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(3);
                        done();
                    })
            })
        })
    })
    
    describe('/PUT/inc/:id Bars', () => {
        it('should increase numAttendees for a bar based on :id', (done) => {
            let bar = new Bar({ bar_id: 'the-loft-lubbock-2', numAttendees: 1 })
            bar.save((err, bar) => {
                chai.request(server)
                    .put('/bars/inc/' + bar.bar_id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Bar attendees increased!');
                        res.body.bar.should.have.property('ok').eql(1);
                        res.body.bar.should.have.property('n').eql(1);
                        let query = Bar.findOne({ bar_id: bar.bar_id })
                        query.exec((err, result) => {
                            result.numAttendees.should.be.eql(2)
                            done();
                        })
                    })
            })
        })

        it('should create bar document if it does not exists', (done) => {
            let bar_id = 'fluffykins-hidehout';
            chai.request(server)
                .put('/bars/inc/' + bar_id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.bar.should.have.property('ok').eql(1);
                    res.body.bar.should.have.property('n').eql(1);
                    res.body.bar.should.have.property('upserted');
                    let query = Bar.findOne({ bar_id: bar_id })
                        query.exec((err, result) => {
                            result.numAttendees.should.be.eql(1)
                            done();
                        })
                })
        })
    })

    describe('/PUT/dec/:id Bars', () => {
        it('should decrease numAttendees for a bar based on :id', (done) => {
            let bar = new Bar({ bar_id: 'bella-barn', numAttendees: 5 })
            bar.save((err, bar) => {
                chai.request(server)
                    .put('/bars/dec/' + bar.bar_id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Bar attendees decreased!');
                        res.body.bar.should.have.property('ok').eql(1);
                        res.body.bar.should.have.property('n').eql(1);
                        let query = Bar.findOne({ bar_id: bar.bar_id })
                        query.exec((err, result) => {
                            result.numAttendees.should.be.eql(4)
                            done();
                        })
                    })
            })
        })

        it('should not decrease numAttendees below 0', (done) => {
            let bar = new Bar({ bar_id: 'bella-barn', numAttendees: 0 })
            bar.save((err, bar) => {
                chai.request(server)
                    .put('/bars/dec/' + bar.bar_id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Bar attendees cannot be decreased below 0!');
                        res.body.bar.should.have.property('ok').eql(1);
                        res.body.bar.should.have.property('n').eql(0);
                        let query = Bar.findOne({ bar_id: bar.bar_id })
                        query.exec((err, result) => {
                            result.numAttendees.should.be.eql(0)
                            done();
                        })
                    })
            })
        })
    })
})