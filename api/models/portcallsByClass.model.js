const mongoose = require("./mongooseInstance");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// this will be our data base's data structure
const DataSchema = new Schema(
    {
            "_id" : ObjectId,
            "port_id" : String,
            "vessel_class" : String,
            "portcalls_last_year" : Number,
            "port_name" : String
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("PortcallsByClass", DataSchema, 'portcalls_by_class');
