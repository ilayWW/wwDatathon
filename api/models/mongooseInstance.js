const mongoose = require("mongoose");

const portsDB = 'mongo.green.1.windward.com:27017/ports';
const dbRoute = `mongodb://${ portsDB }`;
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log(`connected to the ports db`));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;
