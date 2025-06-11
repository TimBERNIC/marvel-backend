const express = require("express");
const route = express.Router();
const encBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");
const uid2 = require("uid2");
const isAuthenticated = require("../middleware/isAuthenticated");

const User = require("../models/User");

// POST Create New Acccount
route.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "missing parameters" });
    } else {
      const foundAccountWithEmail = await User.findOne({ email: email });
      if (foundAccountWithEmail) {
        return res
          .status(409)
          .json({ message: "email account already register" });
      } else {
        const newSalt = uid2(24);
        const newHash = SHA256(password + newSalt).toString(encBase64);
        const newToken = uid2(36);

        const newUser = new User({
          email: req.body.email,
          username: username,
          favorite: null,
          token: newToken,
          hash: newHash,
          salt: newSalt,
        });

        await newUser.save();
        const responseObject = {
          _id: newUser._id,
          token: newUser.token,
          account: newUser.account,
        };
        return res.status(201).json(responseObject);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Login
route.post("/user/login", async (req, res) => {
  try {
    const foundAccount = await User.findOne({ email: req.body.email });
    if (!foundAccount) {
      return res.status(401).json({ message: "Invalid email or password" });
    } else {
      const loginHash = SHA256(req.body.password + foundAccount.salt).toString(
        encBase64
      );
      if (loginHash !== foundAccount.hash) {
        return res.status(401).json({ message: "Invalid email or password" });
      } else {
        const responseObject = {
          _id: foundAccount._id,
          token: foundAccount.token,
          account: foundAccount.account,
        };
        return res.status(201).json(responseObject);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//PUT Add Favorite

route.put("/user/favorite/:id", isAuthenticated, async (req, res) => {
  try {
    const foundUser = req.user;

    const foundFavoriteComic = foundUser.favorites.find((element) => {
      return element.comicId === req.params.id;
    });

    if (foundFavoriteComic) {
      return res.status(403).json("Favori déjà existant");
    } else {
      const favoritesTab = foundUser.favorites;
      favoritesTab.push({ comicId: req.params.id });
      await foundUser.save();
      return res.status(201).json("Favoris ajouté à la base de donnée");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//PUT Delete Favorite
route.put("/user/delete/:id", isAuthenticated, async (req, res) => {
  try {
    const foundUser = req.user;
    const foundFavoriteComicIndex = foundUser.favorites.findIndex((element) => {
      return element.comicId === req.params.id;
    });
    console.log(foundFavoriteComicIndex);

    if (foundFavoriteComicIndex) {
      const favoritesTab = foundUser.favorites;
      favoritesTab.splice(foundFavoriteComicIndex, 1);

      await foundUser.save();
      return res.status(403).json("Favori supprimé");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = route;
