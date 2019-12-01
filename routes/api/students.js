const express = require("express");
const router = express.Router();

const Course = require("../../models/course");
const Student = require("../../models/student");



// Handle incoming GET requests to /orders
router.get("/", (req, res, next) => {
  Student.find().populate('course').exec().then(docs => {    
      res.status(200).json({
        count: docs.length,
        students: docs.map(doc => {
          return {
            studentId: doc.studentId,
            fName: doc.fName,
            lName: doc.lName,
            course: doc.course,
            request: {
              type: "GET",
              url: "http://68.183.144.13:8080/students/" + doc.studentId
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  Course.findOne({courseId: req.body.courseId})
    .then(course => {
      if (!course) {
        return res.status(404).json({
          message: "Course not found"
        });
      }
      return Student.find().exec()}).then( students => {
      const newStudentId = students.length + 1;  
      const student = new Student({
        studentId: newStudentId,
        fName: req.body.fName,
        lName: req.body.lName,
        department: req.body.department,
        courseId: req.body.courseId       
      });
      return student.save();
    })
    .then(result => {      
      res.status(201).json({
        message: "Student stored",
        createdStudent: {
            studentId: result.studentId,
            fName: result.fName,
            lName: result.lName,
            department: result.department,
            course: result.course 
        },
        request: {
          type: "GET",
          url: "http://68.183.144.13:8080/students/" + result.studentId
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:studentId", (req, res, next) => {
  Student.findOne({studentId: req.params.studentId}).populate('course').exec().then(student => {
      if (!student) {
        return res.status(404).json({
          message: "Student not found"
        });
      }      
      console.log(student.course);
      let popStudent = {
        studentId: student.studentId,
        department: student.department,
        fName: student.fName,
        lName: student.lName,
        course: student.course      
      }
      res.status(200).json({
        student: popStudent,
        request: {
          type: "GET",
          url: "http://68.183.144.13:8080/students"
        }
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:studentId", (req, res, next) => {
  Student.remove({ studentId: req.params.studentId }).exec().then(result => {
      res.status(200).json({
        message: "Student deleted",
        request: {
          type: "GET",
          url: "http://68.183.144.13:8080/student",
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
