const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const portsDB = 'mongo.green.1.windward.com:27017/ports';

// Connection URL
const dbRoute = `mongodb://${ portsDB }`;

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log(`connected to the port_accidents collection`));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// this will be our data base's data structure
const DataSchema = new Schema(
    {
        _id: String,
        port_id: String,
        port_name: String,
        accidents_count: Number,
        accidents: []
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("PortAccidents", DataSchema, 'port_accidents');
