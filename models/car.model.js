const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  fuelType: {
    type: String,
    required: true
  },
  transmissionType: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("Car", carSchema);
