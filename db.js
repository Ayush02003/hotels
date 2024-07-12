const mongoose = require("mongoose");

// connection URL

require('dotenv').config();

// const mongoURL = process.env.db_url_local
const mongoURL = process.env.db_url;
// setup mongodb collection
mongoose.connect(mongoURL
    // useNewUrlParser: true,
    // useUnifiedTopology: true
);

// get the default connection
const db = mongoose.connection; 
db.on('connected', () => {
    console.log("Connected Successfully"); 
});

db.on('disconnected', () => {
    console.log("Disconnected from server");
});

db.on('error', (err) => {
    console.error("Error !!!", err);
});

module.exports = db;
