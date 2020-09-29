const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "src", "views", "screens"));

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/__dev_bear", function (req, res) {
  res.render("__dev_bear");
});
app.get("/__dev_wscrg", function (req, res) {
  res.render("__dev_wscrg");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use("/", express.static(path.resolve(__dirname, "public")));
