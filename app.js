const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
const allow = process.env.ALLOW_ORIGIN || "*";
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  .use("/", require("./routes"));

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(`Connected to DB and listening on ${port}`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

module.exports = app;