const auth = (req, res, next) => {
    if (req.query.username === "Sergio") {
        next();
    } else {
        res.send("Access Denied")
        // res.redirect("http://localhost:8000")
        // res.json({message: "You are not the correct user, please login as correct user"})
    }
}

export default auth;