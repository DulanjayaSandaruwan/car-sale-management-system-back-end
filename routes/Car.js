const express = require("express");
const Car = require("../models/car.model");
const router = express.Router();
const app = express();

app.use(express.json());

router.get("/", async (req, res) => {
  try {
    const car = await Car.find();
    res.json(car);
  } catch (err) {
    res.send("Err:" + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.json(car);
  } catch (err) {
    res.send("Err:" + err);
  }
});

router.post("/addCar", async (req, res) => {
  const car = new Car({
    image: req.body.image,
    regNo: req.body.regNo,
    brand: req.body.brand,
    price: req.body.price,
    fuelType: req.body.fuelType,
    transmissionType: req.body.transmissionType,
  });
  try {
    const response = await car.save();
    // res.send(response)
    res.json(response);
    console.log(req.body);
  } catch (err) {
    res.send("Err:" + err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    (car.image = req.body.image),
      (car.regNo = req.body.regNo),
      (car.brand = req.body.brand),
      (car.price = req.body.price),
      (car.transmissionType = req.body.transmissionType);

    const response = await car.save();
    res.json(response);
  } catch (err) {
    res.send("Err:" + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    const response = await car.remove();
    res.json(response);
  } catch (err) {
    res.send("Err:" + err);
  }
});

module.exports = router;
