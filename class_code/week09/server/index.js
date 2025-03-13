
//Imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookRouter from "./routers/bookRouter.js"

//Variable Declarations
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

//Middleware

// routes
app.use("/book", bookRouter);

//start server
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is up on: http://localhost:${PORT}`);
    });
});