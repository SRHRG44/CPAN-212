import express from "express";
import cors from "cors";
import multer from "multer";
// const express = require("express"); // if using common JS (Default)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now();
        cb(null, uniquePrefix + file.fieldname);
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() *1E9)
        // cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
const app = express();
const PORT = process.env.PORT || 8000;

// middlelware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // this line is used for plain HTML FORMS
app.use(express.json()); // this line is used for JSON

// routes
app.get("/", (req, res) => {
    res.send("Welcome to our server");
});

app.get("/data", (req, res) => {
    res.json({
        name: "Sergio",
        Password: "mexMEXmex",
        Username: "sergio44",
    });
});

app.post("/login", (req, res) => {
    console.log(req.body);
    res.json("I got your Information");
});

app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.json("I got your file");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
    res.status(404).send("Page not found");
});
