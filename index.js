const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const winston = require("winston");
const morgan = require("morgan");
const path = require("path");
const config = require("config");
const app = express();

// mongoose
mongoose
  .connect(config.get("dbConfig.address"))
  .then(() => {
    console.log(">> DataBase == 1 <<");
  })
  .catch(() => {
    console.log(">> DataBase == 0 <<");
  });

// set view engine
app.set("view engine", "ejs");

// static
app.use(express.static(path.join(__dirname, "/public")));

// bootstrap
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist"))
);

// express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie & session
app.use(cookieParser(config.get("cookieSecret")));
app.use(
  session({
    secret: config.get("sessionSecret"),
    resave: true,
    saveUninitialized: true,
    cookie: { expires: new Date(Date.now() + 1000 * 3600 * 24 * 100) },
  })
);

// flash
app.use(flash());

// error log
winston.add(new winston.transports.File({ filename: "logfile.log" }));

// morgan & errors
if (app.get("env") === "production") {
  // error handle
  process.on("uncaughtException", (ex) => {
    console.log(">> ERROR -- uncaughtException <<");
    winston.error(ex.message, ex);
    process.exit(1);
  });
  process.on("unhandledRejection", (ex) => {
    console.log(">> ERROR -- unhandledRejection <<");
    winston.error(ex.message, ex);
    process.exit(1);
  });
  app.use(morgan("tiny"));
}

app.use("/", require("./routes/index"));

const port = config.get("port") || 3000;
app.listen(port, () => {
  console.log(`>> App == 1 ==> ${port} <<`);
});
