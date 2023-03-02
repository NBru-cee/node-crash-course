const http = require("http");
const fs = require("fs");
const _ = require("lodash");
const server = http.createServer((req, res) => {
    //lodash
    const num = _.random(0, 30);
    console.log(num);
    const greet = _.once(() => {
        console.log("hello");
    });
    greet();
    //setting content header type
    console.log(req.url, req.method);
    res.setHeader("Content-Type", "text/html");
    let path = "./views/";
    switch (req.url) {
        case "/":
            path += "index.html";
            res.statusCode = 200;
            break;
        case "/about":
            path += "about.html";
            res.statusCode = 200;
            break;
        case "/about-bruchi":
            res.setHeader("Location", "/about");
            res.statusCode = 301;
            break;
        default:
            path += "404.html";
            res.statusCode = 404;
            break;
    }
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.end(data);
        }
    });
});
server.listen(3000, "localhost", () => {
    console.log(`Listening for requests on port 3000...`);
});
