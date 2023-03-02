const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

//connect to mongodb
const dbURI =
    "mongodb+srv://netninja:testing1234@nodetuts.pubjlsi.mongodb.net/node-tuts?retryWrites=true&w=majority";

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
app.use(express.static("./public/"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

//dynamic routes
app.get("/blogs", (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("index", { title: "All Blogs", blogs: result });
        })
        .catch((err) => console.log(err));
});

app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => res.redirect("/blogs"))
        .catch((err) => console.log(err));
});



app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

app.get("/create", (req, res) => {
    res.render("create", { title: "Create a new blog" });
});

app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});
