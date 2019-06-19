const express = require('express');
const router = express.Router();

const pscModel = require('../models/psc.model');

router.get('/', async function (req, res, next) {
    try {
        await pscModel.find({imo: '9980150'}, function(err, doc) {
            res.json(doc);
        });
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

module.exports = router;
