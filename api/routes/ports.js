const express = require('express');
const router = express.Router();
var mongo = require('mongodb');

const models = {
    ComplianceModel: require('../models/compliance.model'),
    DurationsModel: require('../models/durations.model'),
    ImagesModel: require('../models/images.model'),
    IntelligenceRiskModel: require('../models/intelligenceRisk.model'),
    PortAccidentsModel: require('../models/port_accidents.model'),
    PortcallsModel: require('../models/portcalls.model'),
    PortcallsByClassModel: require('../models/portcallsByClass.model'),
    PortcallsByDateModel: require('../models/portcallsByDate.model'),
    PortcallsUniqueModel: require('../models/portcallsUnique.model'),
    PscStatsModel: require('../models/pscStats.model'),
    StaticDataModel: require('../models/staticData.model'),
};


/**
 *  Model Getters
 */
const getPortByString = async (str = '', res) => {
    const query = str ? { port_name: new RegExp(str, "i") } : {};

    return await models.ImagesModel.find(query,
        'port_name port_id url', function (err, doc) {
            res.json(doc);
        }).limit(100)
};

const getPortById = async (port_id = '', res) => {
    return await models.ImagesModel.find({ port_id },
        'port_name port_id url', function (err, doc) {
            res.json(doc);
        }).limit(100)
};

const getPortStaticById = async (port_id = '', res) => {
    return await models.StaticDataModel.find({ port_id: mongo.ObjectID(port_id) },
        'port_name port_id country ISPSCompliance coordinates', function (err, doc) {
            res.json(doc);
        }).limit(100)
};

const getPortPortcallsByDate = async (port_id = '', res) => {
    return await models.PortcallsByDateModel.find({ port_id },
        'month port_id portcalls_last_year', function (err, doc) {
            res.json(doc);
        }).limit(100)
};

const getPortPortcallsByClass = async (port_id = '', res) => {
    return await models.PortcallsByClassModel.find({ port_id },
        'vessel_class port_id portcalls_last_year', function (err, doc) {
            res.json(doc);
        }).limit(100)
};

const getRiskInfo = async (port_id = '', res) => {
    return await models.IntelligenceRiskModel.find({ port_id },
        'port_id vessel_count_total vessel_count_risky risky port_percentile', function (err, doc) {
            res.json(doc);
        }).limit(100)
};

const getByModelName = async (port_id = '', model, fields, res) => {
    return await models[model].find({ port_id },
        fields, function (err, doc) {
            res.json(doc);
        }).limit(100)
};

/**
 *  Routes
 */
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

router.get('/compliance/:id', async function (req, res, next) {
    try {
        return getByModelName(req.params.id,
            'ComplianceModel',
            'port_id compliance_breaking_vessels total_vessels ratio port_name', res);
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

router.get('/durations/:id', async function (req, res, next) {
    try {
        return getByModelName(req.params.id,
            'DurationsModel',
            'port_id average_portcall_duration port_name', res);
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

router.get('/portAccidents/:id', async function (req, res, next) {
    try {
        return getByModelName(req.params.id,
            'PortAccidentsModel',
            'port_id accidents_count accidents', res);
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

router.get('/portcalls/:id', async function (req, res, next) {
    try {
        return getByModelName(req.params.id,
            'PortcallsModel',
            'port_id portcalls_last_year port_name', res);
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

router.get('/portAccidents/:id', async function (req, res, next) {
    try {
        return getByModelName(req.params.id,
            'PortAccidentsModel',
            'port_id accidents_count accidents', res);
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

router.get('/portcallsUnique/:id', async function (req, res, next) {
    try {
        return getByModelName(req.params.id,
            'PortcallsUniqueModel',
            'port_id portcalls_uniq port_name', res);
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

router.get('/pscStats/:id', async function (req, res, next) {
    try {
        return getByModelName(req.params.id,
            'PscStatsModel',
            'port_id inspections_with_deficiencies_portcalls_ratio detentions_portcalls_ratio inspections_portcalls_ratio port_name', res);
    } catch ( e ) {
        res.json({ error: { e } })
    }
});

module.exports = router;
