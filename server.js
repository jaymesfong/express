const serveIndex = require("serve-index");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const path = require("path");
app.set("view engine", "ejs");

//route to render homepage
app.get("/", function(req, res) {
  res.render("pages/index");
});

//route to give current time
app.use("/time", (req, res, next) => {
  res.send(`Time: ${Date.now()}`);
  next();
});

//route to place a cookie
app.use(cookieParser());
app.get("/cookie", function(req, res) {
  res.cookie("name", "cs290").send("cookie set"); //Sets name = express
  console.log("Cookies: ", req.cookies);
});

//route to download zipped webpages
app.get("/download", function(req, res) {
  var file = __dirname + "/express.zip";
  res.download(file); // Set disposition and send it.
});

//route to catch any other pages
app.get("*", function(req, res) {
  res.render("pages/error");
});
app.listen(port, function() {
  console.log(`Console is running on port: ${port}`);
});
