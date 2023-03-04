const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
//express app
const app = express();

//connect to mongodb
const dbURI =
    "mongodb+srv://netninja:testing1234@nodetuts.pubjlsi.mongodb.net/node-tuts";

mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000);
        console.log("mongodb connected successfully");
    })
    .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
}); 

//routes
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRoutes);

app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});
