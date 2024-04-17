const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  createdDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Project", projectSchema);
