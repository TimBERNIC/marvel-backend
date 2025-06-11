// récupération des packages
const mongoose = require("mongoose");

// construction de modèle
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    username: String,
    favorites: [],
    token: String,
    hash: String,
    salt: String,
  }),
  "users"
);

// export
module.exports = User;
