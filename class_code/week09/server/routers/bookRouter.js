import express from "express";
import Book from "./models/book.js";
import {fetchAllBooks} from "./controllers/bookController.js";



const router = express.Router();

router.get("/fetch-all", fetchAllBooks);

router.get("/itm/:id", async (req, res) => {
    Book.find({id: req.params.id}).then((results) => {
        res.json(results);
    })
})

router.get("/fetch-query", async (req, res) => {
    let filters = {};
    if (req.query.title) {
        filters.title = "";
        // filters.title = req.query.title;
    }
    // if (req.query.author) {
    //     filters.author = req.query.author;
    // }
    // if (req.query.publisher) {
    //     filters.publisher = req.query.publisher;
    // }
    Book.find(filters).then((results) => {
        res.json(results);
    })
})

// C - create new entry
router.post("/add_book", (req, res) => {
// 1 - get information from the req.body
// 2 - create a new object instance of Book with the req.body information
// 3 - save, using the ".save()" function from mongoose
// step 1
    const { title, author, publishers, pages, release_date, ISBN } = req.body;
// step 2 - similar to things you did in Java and Python
    const newBook = new Book({
        title, author, publisher, pages, ISBN, release_date,
    });
// step 3
    newBook.save().then((result) => {
        res.json(result);
    });
});

router.put("/:id", (req, res) => {
    Book.findByIdAndUpdate(
        req.params.id,
        {$push: { reviews:
            {name: "bob", review: "Bad"}}})
        .then((results) => {
        res.json(results);
})
})

router.delete("/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id);
})

export default router;

//URL: http://localhost:8000/book/fetch-all