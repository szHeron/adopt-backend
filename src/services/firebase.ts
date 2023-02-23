const admin = require("firebase-admin");
const config = require('../config/firebase_config.json')

admin.initializeApp({
    credential: admin.credential.cert(config)
});

module.exports = admin;