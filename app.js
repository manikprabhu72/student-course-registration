const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const courseRoutes = require("./routes/api/courses");
const studentRoutes = require("./routes/api/students");
const viewsRoutes = require('./routes/viewsController');

mongoose.connect("mongodb+srv://root:root@student-course-registration-by7sb.mongodb.net/registration?retryWrites=true&w=majority");
var db = mongoose.connection;

db.on('error', function(){
    console.log()
    app.use(function(res,res){
        res.status(error.status || 500);
        res.json({
            error: {
                message: "Error Connecting to DB"
            }
        });
    });
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/assets', express.static('assets'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use('/registration', viewsRoutes);
app.use("/courses", courseRoutes);
app.use("/students", studentRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(8080);
