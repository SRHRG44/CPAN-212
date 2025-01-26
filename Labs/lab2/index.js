import express from "express";
import lab_router from "./routers/lab_router.js";

const app = express();
const PORT = process.env.Port || 8000;

app.use("/lab2", lab_router);

app.get("/", (req, res) => {
    res.send("Welcome to Lab 2 Server");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
