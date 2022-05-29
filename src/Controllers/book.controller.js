const express = require("express");
const Book = require("../models/book.model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);

    return res.status(201).send(book);
  } catch (e) {
    res.status(500).json({ message: e.message, status: "Failed" });
  }
});
// for all book
router.get("/all", async (req, res) => {
  try {
    const books = await Book.find().lean().exec();
    return res.send({ books });
  } catch (e) {
    res.status(500).json({ message: e.message, status: "Failed" });
  }
});
// category book
router.get("/category/:id", async (req, res) => {
  try {
    const books = await Book.find().lean().exec();
    console.log(req.params.id);
    return res.send(books.filter((e) => e.category === req.params.id));
  } catch (e) {
    res.status(500).json({ message: e.message, status: "Failed" });
  }
});

// search by title or author name
router.get("/searchByName/:id", async (req, res) => {
  try {
    const books = await Book.find().lean().exec();
    console.log(books, ":books");
    return res.send(
      books.filter((e) => e.title === req.params.id || e.name === req.params.id)
    );
  } catch (e) {
    res.status(500).json({ message: e.message, status: "Failed" });
  }
});

//update status
router.patch("/status/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    console.log(updates.status);
    console.log(options);
    const result = await Book.findByIdAndUpdate(id, updates, options);
    if (updates.status === "outForReading") {
      result.trackingDetails["outForReading"] = Date.now();
      console.log(result);
    } else if (updates.status === "returned") {
      result.trackingDetails["returned"] = Date.now();
      console.log(result);
    }

    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});
// trackingDetails for book
router.get("/trackingDetails/:id", async (req, res) => {
  try {
    const Books = await Book.findById(req.params.id).lean().exec();
    return res.status(200).send(Books.trackingDetails);
  } catch (e) {
    res.status(500).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
