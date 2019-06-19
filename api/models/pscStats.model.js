const mongoose = require("./mongooseInstance");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// this will be our data base's data structure
const DataSchema = new Schema(
    {
            _id : ObjectId,
            port_id : String,
            port_name : String,
            inspections_portcalls_ratio : Number,
            detentions_portcalls_ratio : Number,
            inspections_with_deficiencies_portcalls_ratio : Number
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("PscStats", DataSchema, 'psc_stats');
