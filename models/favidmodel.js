const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const favidSchema = new mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "Home" // Reference to the Home model
  }
});

module.exports = mongoose.model("Favid", favidSchema);