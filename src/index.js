const express = require("express");
const app = express();

app.use(express.json());

const userController = require("./controllers/userController");
const galleryController = require("./controllers/galleryController");

app.use("/users", userController);
app.use("/gallery", galleryController);

module.exports = app;
