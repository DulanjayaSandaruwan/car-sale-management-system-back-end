const express = require("express");
const Users = require("../models/users.model");
const router = express.Router();
const app = express();

app.use(express.json());

router.post("/register", async (req, res) => {
  try {
    const users = new Users({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      password: req.body.password,
    });
    const response = await users.save();
    res.json(response);
  } catch (error) {
    res.status(422).send(error.message);
  }
});

module.exports = router;
