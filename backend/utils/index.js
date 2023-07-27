// NPM Modules
const Sequelize = require("sequelize");
const admin = require("firebase-admin");
const { database, username, password, dialect, host, port } =
  require("../config/config")[process.env.NODE_ENV];
// Models
const { Company } = require("../models");

module.exports = {
  doesCompanyExist: async (name) => {
    const company = await Company.findOne({
      where: {
        companyName: name,
      },
    });

    if (company === null) {
      return {
        company: null,
        exists: false,
      };
    } else {
      return {
        company: company.dataValues,
        exists: true,
      };
    }
  },
  firebaseAdminAuth: () => {
    const firebaseAdminConfig = {
      type: process.env.type,
      project_id: process.env.project_id,
      private_key_id: process.env.private_key_id,
      private_key: process.env.private_key,
      client_email: process.env.client_email,
      client_id: process.env.client_id,
      auth_uri: process.env.auth_uri,
      token_uri: process.env.token_uri,
      auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.client_x509_cert_url,
      universe_domain: process.env.universe_domain,
    };

    const serviceAccount = JSON.parse(JSON.stringify(firebaseAdminConfig));
    //  Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://authentication-8151c.firebaseio.com",
    });

    return admin;
  },
  sequelizeConnection: () => {
    const sequelize = new Sequelize(database, username, password, {
      dialect,
      host,
      port,
    });

    return sequelize;
  },
};
