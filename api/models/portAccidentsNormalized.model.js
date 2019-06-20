const mongoose = require("./mongooseInstance");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new Schema(
    {
        port_id: String,
        port_name: String,
        "accidents_count": Number,
        "accidents_port_calls_ratio": Number,
        "port_calls_last_year": Number,
        "risk_percentile": Number,
        "port_complexity": Number
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("PortAccidentsNormalized", DataSchema, 'port_accidents_normalized');
