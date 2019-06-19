const express = require('express');
const router = express.Router();
var mongo = require('mongodb');
const imagesModel = require('../models/images.model');
const StaticData = require('../models/staticData.model');
const PortcallsByDate = require('../models/portCallsByDate.model');
const IntelligenceRisk = require('../models/intelligenceRisk.model');
const PortcallsByClass = require('../models/portCallsByClass.model');


const getPortByString = async (str = '', res) => {
    const query = str ? { port_name: new RegExp(str, "i") } : {};

    return await imagesModel.find(query, 'port_name port_id url', function (err, doc) {
        res.json(doc);
    }).limit(100)
};

const getPortById = async (port_id = '', res) => {
    return await imagesModel.find({ port_id }, 'port_name port_id url', function (err, doc) {
        res.json(doc);
    }).limit(100)
};

const getPortStaticById = async (port_id = '', res) => {
    return await StaticData.find({ port_id: mongo.ObjectID(port_id) }, 'port_name port_id country ISPSCompliance coordinates', function (err, doc) {
        res.json(doc);
    }).limit(100)
};

const getPortPortcallsByDate = async (port_id = '', res) => {
    return await PortcallsByDate.find({ port_id }, 'month port_id portcalls_last_year', function (err, doc) {
        res.json(doc);
    }).limit(100)
};

const getPortPortcallsByClass = async (port_id = '', res) => {
    return await PortcallsByClass.find({ port_id }, 'vessel_class port_id portcalls_last_year', function (err, doc) {
        res.json(doc);
    }).limit(100)
};

const getRiskInfo = async (port_id = '', res) => {
    return await IntelligenceRisk.find({ port_id }, 'port_id vessel_count_total vessel_count_risky risky port_percentile', function (err, doc) {
        res.json(doc);
    }).limit(100)
};


router.get('/images/:input', async function (req, res, next) {
    try {
        return getPortByString(req.params.input, res);
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

router.get('/images', async function (req, res, next) {
    try {
        return getPortByString('', res);
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        return getPortById(req.params.id, res);
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

router.get('/static/:id', async function (req, res, next) {
    try {
        return getPortStaticById(req.params.id, res);
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

router.get('/portCallsByDate/:id', async function (req, res, next) {
    try {
        return getPortPortcallsByDate(req.params.id, res);
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

router.get('/portCallsByClass/:id', async function (req, res, next) {
    try {
        return getPortPortcallsByClass(req.params.id, res);
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

router.get('/risk/:id', async function (req, res, next) {
    try {
        return getRiskInfo(req.params.id, res);
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

module.exports = router;
