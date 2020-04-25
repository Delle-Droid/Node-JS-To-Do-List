// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

const items = ["Work", "Eat", "Play"];
const workItem = [];

app.set('view engine', 'ejs');

app.get("/", (req, res) => {

  const day = date.getDate();

  res.render("list", {
    currentDay: day,
    newListItems: items
  });

});

app.post("/", (req, res) => {

  const listItem = req.body.newItem;

  if (req.body.list === "Today") {
    workItem.push(listItem)
    res.redirect("/work");
  } else {
    items.push(listItem);
    res.redirect("/");
  }

});

app.get("/work", (req, res) => {
  res.render("list", {
    currentDay: "Today",
    newListItems: workItem
  });

});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});