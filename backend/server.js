// NPM Modules
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
// Server Variables
const PORT = process.env.PORT || 3001;
const app = express();
const { mongooseConnection, sequelizeConnection } = require("./utils");
// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use(require("./routes/applicationRoutes"));
app.use(require("./routes/companyRoutes"));
app.use(require("./routes/platformRoutes"));
app.use(require("./routes/userRoutes"));
// Init
app.listen(PORT, async (err) => {
  try {
    if (err) {
      throw new Error(err);
    }
    console.log(`Running on PORT:${PORT}`);
    sequelizeConnection().authenticate();
    console.log("Connected to PostgreSQL DB");
    await mongooseConnection();
  } catch (error) {
    console.log(error);
  }
});
