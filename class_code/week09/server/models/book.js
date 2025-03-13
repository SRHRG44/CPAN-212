import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            // required: true,
        },
        author: {
            type: String,
            // required: true,
        },
        publisher: {
            type: String,
            // required: true,
        },
        pages: {
            type: Number,
            // required: true,
        },
        release_date: {
            type: String,
        },
        ISBN: {
            type: String,
        },
        // genre: {
        //     type: String,
        //     required: true,
        // },
        // year: {
        //     type: Number,
        //     required: true,
        // },
    }
);

const Book = mongoose.model("books", bookSchema);