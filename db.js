const mongoose = require("mongoose");

// connection URL
const mongoURL = 'mongodb://localhost:27017/hotel';

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
