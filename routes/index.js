const express = require("express");
const winston = require("winston");
const config = require("config");
const { body } = require("express-validator");
const router = express.Router();
const IndexController = require("../controllers/controller.index");

router.use((req, res, next) => {
  res.locals = { appname: config.get("name") };
  next();
});

router.get("/", IndexController.indexView);
router.get("/about", IndexController.aboutView);
router.get("/analyze", IndexController.analyzeView);
router.post(
  "/analyze",
  [body("link", "Invalid Link!").isLength({ min: 5 })],
  IndexController.analyze
);
router.post(
  "/create",
  [body("link", "Invalid Link!").isURL()],
  IndexController.create
);
router.get("/:short_id", IndexController.shortLinkView);

// 404 Error
router.all("*", (req, res, next) => {
  try {
    let err = new Error("Page not Found!");
    err.status = 404;
    throw err;
  } catch (err) {
    next(err);
  }
});

// Handle Errors
router.use((err, req, res, next) => {
  const code = err.status || 500;
  const message = err.message || "";
  const stack = err.stack || "";
  if (router.get("env") === "development") {
    res.render("errors/debug", { code, message, stack });
  } else if (code === 404) {
    res.render("errors/404");
  } else if (code === 500) {
    if (router.get("env") === "production") {
      winston.error(err.message, err);
    }
    res.render("errors/500");
  }
});

module.exports = router;
