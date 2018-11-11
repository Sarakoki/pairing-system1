var mongoose = require("mongoose");
mongoose.connect(
  "mongodb://sara:sara1234@ds155663.mlab.com:55663/pairing-system",
  {
    useNewUrlParser: true,

    useCreateIndex: true
  }
);

var db = mongoose.connection;

db.on("error", function(err) {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connected successfully");
});

//create schemas
var studentSchema = mongoose.Schema({
  fullName: String,
  level: Number
});

var historySchema = mongoose.Schema({
  table: [{ student1: String, student2: String }]
});

Student = mongoose.model("Student", studentSchema);

History = mongoose.model("History", historySchema);

module.exports.Student = Student;
module.exports.History = History;
