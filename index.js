const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const app = express();
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL);

app.use(express.json());
app.use(cors());

const charactersRoute = require("./routes/CharactersRoute");
const comicsRoute = require("./routes/ComicsRoute");
const userRoute = require("./routes/UserRoute");

app.use(charactersRoute);
app.use(comicsRoute);
app.use(userRoute);

//Bienvenue
app.get("/", async (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "Bienvenue sur le serveur non-officiel de Marvel!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Récupération
app.all(/.*/, (req, res) => {
  return res.status(404).json({ message: "path not found" });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Marvel Server is Started on port : ${PORT}🦸🚀`);
});
