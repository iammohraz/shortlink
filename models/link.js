const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const Schema = mongoose.Schema;
const linkSchema = new Schema({
  link: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 1000,
  },
  short_id: {
    type: String,
    require: true,
    unique: true,
    default: () => nanoid(6),
  },
  views: {
    type: Number,
    require: true,
    default: 0,
  },
  create: {
    type: Date,
    require: true,
    default: new Date(Date.now()),
  },
});

module.exports = mongoose.model("Link", linkSchema);
