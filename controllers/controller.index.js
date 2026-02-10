const controller = require("./controller");
const { validationResult } = require("express-validator");
const config = require("config");
const Link = require("../models/link");

class IndexController extends controller {
  indexView(req, res, next) {
    try {
      let errors = req.flash("errors");
      let create = req.flash("create");
      res.render("index", { errors: errors, create: create });
    } catch (err) {
      next(err);
    }
  }
  aboutView(req, res, next) {
    try {
      res.render("about");
    } catch (err) {
      next(err);
    }
  }
  analyzeView(req, res, next) {
    try {
      let errors = req.flash("errors");
      let views = req.flash("views");
      let date = req.flash("date");
      res.render("analyze", { errors: errors, views: views, date: date });
    } catch (err) {
      next(err);
    }
  }
  async analyze(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("errors", errors.errors);
        return res.redirect("/analyze");
      }
      let link = req.body.link;
      let analyze = await Link.findOne({
        short_id: req.body.link.slice(link.length - 6),
      });
      if (!analyze) {
        req.flash("errors", [{ msg: "Invalid link!" }]);
        return res.redirect("/analyze");
      }
      req.flash("views", analyze.views);
      req.flash("date", analyze.create);
      res.redirect("/analyze");
    } catch (err) {
      next(err);
    }
  }
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("errors", errors.errors);
        return res.redirect("/");
      }
      let newLink = new Link({
        link: req.body.link,
      });
      await newLink.save();
      req.flash("create", `${config.get("domain")}${newLink.short_id}`);
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }
  async shortLinkView(req, res, next) {
    try {
      let link = await Link.findOne({ short_id: req.params.short_id });
      if (!link) {
        return res.render("link", { link: config.get("domain") });
      }
      await Link.updateOne(
        { short_id: req.params.short_id },
        {
          views: link.views + 1,
        }
      );
      res.render("link", { link: link.link });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new IndexController();
