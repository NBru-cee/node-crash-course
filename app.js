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
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

app.use(express.static("./public"));
app.use(morgan("tiny"));

//mongoose and mongo sandbox
app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: "new blog 2",
        snippet: "about my new blog",
        body: "more about my new blog",
    });
    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.get("/all-blogs", (req, res) => {
    Blog.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
    const blogs = [
        {
            title: "Yoshi finds eggs",

            snippet:
                "De Facto standards: A format, or protocol that has become a standard not because it has been approved by a standards organization but because it is widely used in networking",
        },
        {
            title: "Mario finds starts",
            snippet:
                " Standards Organization => ISO: Short for International Organization for Standardization. Note that ISO is not an acronym; instead, the name derives from the Greek word iso, which means equal",
        },
        {
            title: "How to defeat bowser",
            snippet:
                "IEEE: The INstiture of Electrical and Electronics Engineers Standards Association(IEEE-SA) is an organization within IEEE that develops global standards in a broad range of industries, including power and energy,",
        },
    ];
    res.render("index", { title: "Home", blogs });
});
app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});
app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create a new blog" });
});
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});
