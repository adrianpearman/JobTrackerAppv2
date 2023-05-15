// NPM modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Variables
const app = express();
const PORT = process.env.PORT || 3001;
const mongoConnection = require("./middlewares/mongoConnection");

// Routes
const applicationRoutes = require("./routes/applicationRoutes.js");
const recruiterRoutes = require("./routes/recruiterRoutes");
const userRoutes = require("./routes/userRoutes.js");

// This is the rendered build index.html from the client build folder
const clientRoot = require("path").join(__dirname, "../client", "build");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connecting to Database
mongoConnection();

// Setting Routes For Backend
app.use(applicationRoutes);
app.use(recruiterRoutes);
app.use(userRoutes);

// Render client root buildfile if the application is ona production server
if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientRoot));
  app.get("/", (req, res) => {
    res.sendFile("index.html", { clientRoot });
  });
}

const Sequelize = require("sequelize");

var sequelize = new Sequelize("job_tracker_dev", "root", "password", {
  logging: true,
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

app.listen(PORT, async err => {
  if (err) {
    console.error(err);
  }
  await sequelize.authenticate();
  sequelize.sync();
  try {
    const users = await sequelize.query("SELECT * FROM users", {
      type: Sequelize.QueryTypes.SELECT
    });
    console.log("Connection has been established successfully.");
    console.log(users);
  } catch (error) {
    console.log(error);
  }

  console.log(`Running on PORT: ${PORT}`);
});
