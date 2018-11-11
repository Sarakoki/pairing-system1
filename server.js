const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/db");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
//app.set("view engine", "jade");

app.use(express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/node_modules"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

// app.get("/", function(req, res) {
//   res.render("index");
// });

//save student
app.post("/student", function(req, res) {
  const saveStudent = new db.Student(req.body);
  saveStudent
    .save()
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("unable to save to database");
    });
});

//get student
app.get("/student", function(req, res) {
  db.Student.find({}, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(data);
    // console.log(data);
  });
});

//update student
app.put("/student/:studentId", (req, res) => {
  const id = req.params.studentId;
  console.log(id);
  const newValue = req.body;
  db.Student.findOneAndUpdate({ id: id }, newValue, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(data);
  });
});

//delete student
app.delete("/student/:id", (req, res) => {
  const id = req.params.id;
  db.Student.findByIdAndRemove({ id: id }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.send("Student Deleted");
      return;
    }
  });
});

//add to history
app.post("/history", function(req, res) {
  const history = new db.History(req.body);
  history.save((err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send("Get Paired");
  });
});

//show history
app.get("/history", function(req, res) {
  db.History.find({}, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(data);
    return;
  });
});

// app.get("/*", function(req, res) {
//   res.render("index");
// });

app.get("/", function(req, res) {
  res.send("index");
});

const server = app.listen(3000, () => console.log("Listening on 3000"));
