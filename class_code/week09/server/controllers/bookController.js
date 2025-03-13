import express from "express";
import Book from "./models/book.js";


const fetchAllBooks = (req, res) => {
    Book.find().then((results) => {
        res.json(results);
    })
}

export default (fetchAllBooks)