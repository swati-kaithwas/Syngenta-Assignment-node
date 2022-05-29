const express = require("express");
const mongoose = require("mongoose");
const connect = require("./configs/db");

const app = express();
app.use(express.json());

const booksController = require("./Controllers/book.controller");
app.use("/books", booksController);

module.exports = app;
