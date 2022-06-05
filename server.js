//create a web server with express
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || 3000;
const fs = require("fs");

app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/api", function (req, res) {
  let id = req.query.id;
  let color = req.query.color;
  let star = req.query.star;
  let infos = {
    id: id,
    color: color,
    star: star,
  };
  fs.readFile("public/data.json", "utf8", function (err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    data.push(infos);
    data = JSON.stringify(data);
    fs.writeFile("public/data.json", data, "utf8", function (err) {
      if (err) throw err;
    });
  });
  res.redirect("/");
});

app.listen(port, function () {
  console.log("Server listening at port %d", port);
});
