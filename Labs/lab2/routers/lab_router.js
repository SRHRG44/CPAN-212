import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from lab2: Routers");
});

router.get("/name", (req, res) => {
    res.send("Sergio Romero");
});

router.get("/greeting", (req, res) => {
    res.send("Hola, I am Sergio Romero and My Humber Id is n00466753");
});

router.get("/add/:x/:y", (req, res) => {
    let x = parseFloat(req.params.x);
    let y = parseFloat(req.params.y);

    res.send(`${x+y}`);
});

router.get("/calculate/:a/:b/:operation", (req, res) => {
    let a = parseFloat(req.params.a);
    let b = parseFloat(req.params.b);

    switch (req.params.operation) {
        case "add":
            res.send(`${a+b}`);
            break;

        case "sub":
            res.send(`${a-b}`);
            break;

        case "mul":
            res.send(`${a*b}`);
            break;

        case "div":
            res.send(`${a/b}`);
            break;

        default:
            res.send("Incorrect Operator");
    }
});
export default router;