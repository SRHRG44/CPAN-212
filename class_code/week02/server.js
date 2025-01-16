const http = require("http")
const app = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Hello from Home")

    } else if (req.url === "/login") {
        res.end("Please Login")

    } else if (req.url === "/about_us") {
        res.end("This is us")

    } else if (req.url === "/contact_us") {
        res.end("Reach out to us!")

    } else if (req.url === "/fetch_data") {
        res.end("")

    } else {
        res.end("Page not found")
    }

    // console.log(req)
    // res.end("Hi")
})
app.listen(8000)

