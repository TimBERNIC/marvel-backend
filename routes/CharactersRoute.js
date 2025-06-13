const express = require("express");
const router = express.Router();
const axios = require("axios");

const marvelKey = process.env.MARVEL_API_KEY;

//GET

// //récupérer tout les characters avec filtre query

router.get("/characters", async (req, res) => {
  try {
    const { name, limit, skip } = req.query;
    let filter = "";
    if (name) {
      filter += "&name=" + name;
    }
    if (limit) {
      filter += "&limit=" + limit;
    }

    if (skip) {
      filter += "&skip=" + skip;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${marvelKey}${filter}`
    );

    const globalCharactersTab = response.data;

    return res.status(202).json(globalCharactersTab);
  } catch (error) {
    if (error.response) {
      return res.status(500).json({ message: error.response.data });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${marvelKey}`
    );

    const charactersInfo = response.data;

    return res.status(200).json(charactersInfo);
  } catch (error) {
    if (error.response) {
      return res.status(500).json({ message: error.response.data });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});
module.exports = router;
