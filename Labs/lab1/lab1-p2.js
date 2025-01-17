const http = require("http")
const fs = require("fs");

const app = http.createServer((req, res) => {
    if (req.url === "/") {
        let webpage = fs.readdirSync("homepage.html")
        res.end(webpage)

    } else if (req.url === "/homepage") {
        let webpage = fs.readdirSync("homepage.html")
        res.end(webpage)

    } else if (req.url === "/login") {
        res.end("Please Login")

    } else if (req.url === "/about_us") {
        res.end("This is us")

    } else if (req.url === "/contact_us") {
        res.end("Reach out to us!")

    } else if (req.url === "/fetch_data") {
        res.end("DATA")

    } else {
        res.end("Error 404 - Page not found")
    }
})

let PORT = 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});