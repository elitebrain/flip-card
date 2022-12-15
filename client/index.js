const express = require("express");
const path = require("path");

const app = express();

app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.css"));
});
app.get("/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.js"));
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(3000, () => {
  console.log("Running at 3000 port");
});
