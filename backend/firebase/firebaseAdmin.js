// NPM Modules
const admin = require("firebase-admin");
// Local Variable
const serviceAccount = JSON.parse(
  JSON.stringify(require("./firebaseAdminConfig"))
);
//  Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://authentication-8151c.firebaseio.com",
});

module.exports = admin;
