const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer((req, res) => {
    let filePath = "";

    if (req.url === "/" || req.url === "/homepage" || req.url === "/home") {
        filePath = path.join(__dirname, "html_pages", "homepage.html");
    } else if (req.url === "/login") {
        filePath = path.join(__dirname, "html_pages", "login.html");
    } else if (req.url === "/about" || req.url === "/about_us") {
        filePath = path.join(__dirname, "html_pages", "about_us.html");
    } else if (req.url === "/contact" || req.url === "/contact_us") {
        filePath = path.join(__dirname, "html_pages", "contact_us.html");
    } else if (req.url === "/items" || req.url === "/books") {
        filePath = path.join(__dirname, "html_pages", "books.html");
    } else if (req.url === "/profile") {
    filePath = path.join(__dirname, "html_pages", "profile_page.html");
    } else if (req.url === "/register" || req.url === "/registration") {
        filePath = path.join(__dirname, "html_pages", "registration.html");
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Error 404 - Page not found");
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error 500 - Internal Server Error");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }
    });
});

let PORT = 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});