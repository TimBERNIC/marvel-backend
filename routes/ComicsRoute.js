const express = require("express");
const route = express.Router();
const axios = require("axios");

const marvelKey = process.env.MARVEL_API_KEY;

// GET
// récupérer tout les Comics

route.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${marvelKey}`
    );

    const globalComicsTab = response.data.results;
    // Si un titre en body
    // Faire un find avec reg Exp
    if (req.params) {
      const regex = new RegExp(req.params.title, "i");

      const foundComicsByTitle = await globalComicsTab
        .filter((element) => {
          return regex.test(element.title);
        })
        .sort((a, b) => a.title.localeCompare(b.title));

      return res.status(202).json(foundComicsByTitle);
    } else {
      return res.status(202).json(globalComicsTab);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//récupérer avec filtre params

route.get(`/comics/:title`, async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${marvelKey}`
    );

    const globalComicsTab = response.data.results;
    if (req.params) {
      const regex = new RegExp(req.params.title, "i");

      const foundComicsByTitle = await globalComicsTab
        .filter((element) => {
          return regex.test(element.title);
        })
        .sort((a, b) => a.title.localeCompare(b.title));

      return res.status(202).json(foundComicsByTitle);
    } else {
      return res.status(202).json(globalComicsTab);
    }
    // Si un titre en params
    // Faire un find avec reg Exp
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Récupérer tout les Comics d'un character par Id
route.get("/comics/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${marvelKey}`
    );

    return res.status(202).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Récupérer toutes infos sur un comic
route.get("/comic/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.id}?apiKey=${marvelKey}`
    );

    return res.status(202).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = route;
