const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId

const Bar = require('../models/bar');

// GET /bars to retrieve all bars in DB
router.get('/', (req, res) => {
    let query = Bar.find({})
    query.exec((err, bars) => {
        if (err) res.send(err);
        res.json(bars)
    })
})

// PUT /bars/inc/:id to increase numAttendees for a bar based on :id
router.put('/inc/:id', (req, res) => {
    Bar.update(
        { bar_id: req.params.id, numAttendees: {$gte: 0} },
        { 
            $inc: { numAttendees: 1 },
            $push: { usersAttending: req.body.user_id }
        },
        { upsert: true, setDefaultsOnInsert: true }, (err, bar) => {
            if (err) res.send(err)
            res.json({ message: 'Bar attendees increased!', bar })
        })
})

// PUT /bars/dec/:id to decrease numAttendees for a bar based on :id
router.put('/dec/:id', (req, res) => {
    Bar.update(
        { bar_id: req.params.id, numAttendees: {$gte: 1} },
        { 
            $inc: { numAttendees: -1 },
            $pull: { usersAttending: req.body.user_id }
        },
        (err, bar) => {
            if (err) res.send(err)
            if (bar.n === 0) {
                res.json({ message: 'Bar attendees cannot be decreased below 0!', bar })
            } else {
                res.json({ message: 'Bar attendees decreased!', bar })
            }
        })
})

module.exports = router