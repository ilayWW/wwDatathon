const mongoose = require("./mongooseInstance");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// this will be our data base's data structure
const DataSchema = new Schema(
    {
        "_id" : ObjectId,
        "port_id" : String,
        "vessel_count_total" : Number,
        "port_name" : String,
        "vessel_count_risky" : Number,
        "risky" : [
            {
                "name" : String,
                "flag" : String,
                "imo" : String,
                "_id" : String,
                "percentile" : Number
            }
        ]
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("IntelligenceRisk", DataSchema, 'intelligence_risk');
