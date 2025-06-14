const express = require("express");
const router = express.Router();
const axios = require("axios");

const marvelKey = process.env.MARVEL_API_KEY;

// GET
// récupérer tout les Comics

router.get("/comics", async (req, res) => {
  try {
    const { title, limit, skip } = req.query;
    let filter = "";
    if (title) {
      filter += "&title=" + title;
    }
    if (limit) {
      filter += "&limit=" + limit;
    }

    if (skip) {
      filter += "&skip=" + skip;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${marvelKey}${filter}`
    );

    const globalComicsTab = response.data;

    return res.status(202).json(globalComicsTab);
  } catch (error) {
    if (error.response) {
      return res.status(500).json({ message: error.response.data });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

//Récupérer tout les Comics d'un character par Id
router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${marvelKey}`
    );

    return res.status(202).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(500).json({ message: error.response.data });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

//Récupérer toutes infos sur un comic
router.get("/comic/:comicId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${marvelKey}`
    );

    return res.status(202).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(500).json({ message: error.response.data });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
