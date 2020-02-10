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

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  }
  console.log(`Running on PORT: ${PORT}`);
});
