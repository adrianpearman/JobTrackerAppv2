const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../", "../", "../", "../", ".env"),
});

module.exports = {
  development: {
    database: process.env.PG_DATABASE_DEV,
    dialect: "postgres",
    host: process.env.PG_HOST_DEV,
    password: process.env.PG_PASSWORD_DEV,
    port: process.env.PG_PORT_DEV,
    username: process.env.PG_USERNAME_DEV,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
