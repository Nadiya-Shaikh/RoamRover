const express = require('express');
const app = express();
const session = require('express-session')
const flash = require('connect-flash');
const path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({ secret: 'keyboardcat' }));
app.use(flash());

app.get("/names", (req, res) => {
    let { name = "Anonymous!" } = req.query;
    req.session.name = name;
    res.redirect("/reqcount");
})
app.get("/reqcount", (req, res) => {
    if (req.session.count) {
        req.session.count++;

    } else {
        req.session.count = 1;
    }
    req.flash("s", "successful!");
    res.render("flashTest.ejs", { name: req.session.name, msg: req.flash("s") });
})



app.get('/getCookie', (req, res) => {
    res.cookie("name", "Nadiya");
    res.send("get ur cookie")
});


app.get('/', (req, res) => {
    res.send('Home');
});

app.listen(8080, () => {
    console.log('server is listening to port: 8080');
});