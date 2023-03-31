const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();

app.use(
  cookieParser()
);

app.use(cors());
app.use(require("./src/routes"));
process.on("SIGINT", () => {
  process.exit();
});

//Express-session options
const oneDay = 1000 * 60 * 60 * 24; 
app.use(sessions({
    secret: "secretkey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  res.status(err.status).json({
    type: "error",
    message: "the url you are trying to reach is not hosted on our server",
  });
  next(err);
});

module.exports = app;