const express = require("express");
const route = express.Router();
const axios = require("axios");

const marvelKey = process.env.MARVEL_API_KEY;

//GET

//récupérer tout les characters
route.get("/characters/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${marvelKey}`
    );

    const globalCharactersTab = response.data.results;

    return res.status(202).json(globalCharactersTab);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// filtre

route.get("/characters/:name", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${marvelKey}`
    );

    const globalCharactersTab = response.data.results;

    // Si un nom en params
    // Faire un find avec reg Exp
    if (req.params) {
      const regex = new RegExp(req.params.name, "i");

      const foundCharactersByName = await globalCharactersTab.filter(
        (element) => {
          return regex.test(element.name);
        }
      );

      return res.status(202).json(foundCharactersByName);
    } else {
      return res.status(202).json(globalCharactersTab);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = route;
