// récupération des packages
const mongoose = require("mongoose");

// construction de modèle

const User = mongoose.model("User", {
  email: String,
  username: String,
  favorites: [],
  token: String,
  hash: String,
  salt: String,
});

// export
module.exports = User;
