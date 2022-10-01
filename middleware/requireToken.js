const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Users = require("../models/users.model");
const jwtKey = "jnsdnfdju38h";

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "you must be logged in" });
  }
  const token = authorization.replace("Test ", "");
  jwt.verify(token, jwtKey, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "you must be logged in" });
    }
    const { userId } = payload;
    const users = await Users.findById(userId);
    req.users = users;
    next();
  });
};
