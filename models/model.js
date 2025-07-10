const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Favid = require("./favidmodel");



const hostSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true 
    },
  location: { 
    type: String, 
    required: true
   },
  price: {
     type: Number, 
     required: true
     },
  rating: { 
    type: Number, 
    required: true 
  },
  photo: String,
  rules: String,
  description: String,
});

hostSchema.pre('findOneAndDelete', async function (next) {
  const homeid = this.getQuery()._id;
  await Favid.deleteMany({ houseId: homeid });
  next();
});
module.exports = mongoose.model("Home", hostSchema);