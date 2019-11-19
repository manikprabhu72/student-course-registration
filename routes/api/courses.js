const express = require("express");
const router = express.Router();

const Course = require("../../models/course");

router.get("/", (req, res, next) => {
  Course.find().exec().then(docs => {
      const response = {
        count: docs.length,
        courses: docs.map(doc => {
          return {
            courseId: doc.courseId,
            name: doc.name,
            professor: doc.professor,
            department: doc.department,
            credits: doc.credits,
            request: {
              type: "GET",
              url: "http://68.183.144.13:8080/courses/" + doc.courseId
            }
          };
        })
      };
      res.status(200).json(response);
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  let reqBody = req.body;
  Course.find().exec().then(function(courses){
    let newId = 1001 + courses.length;
    const course = new Course({
      courseId: newId,      
      name: reqBody.name,
      professor: reqBody.professor,
      department: reqBody.department,
      credits: reqBody.credits,
    });
    return course.save();
  }).then(result => {      
      res.status(201).json({
        message: "Created Course successfully",
        createdProduct: {
        courseId: result.courseId,      
        name: result.name,
        professor: result.professor,
        department: result.department,
        credits: result.credits,
        request: {
          type: 'GET',
          url: "http://68.183.144.13:8080/courses/" + result.courseId
        }
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  })
});

router.get("/:courseId", (req, res, next) => {
  const id = req.params.courseId;
  Course.findOne({courseId: id}).select("courseId name professor department credits").exec().then(doc => {
    if (doc) {
        res.status(200).json({
            course: doc,
            request: {
                type: 'GET',
                url: 'http://68.183.144.13:8080/courses'
            }
        });
    } else {
      res.status(404).json({ message: "No valid entry found for provided ID" });
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
});

router.patch("/:courseId", (req, res, next) => {
  const id = req.params.courseId;
  const updateObj = {};
  for (const ops of req.body) {
    updateObj[ops.propName] = ops.value;
  }
  console.log(updateObj);
  Course.update({ courseId: id }, { $set: updateObj }).exec().then(result => {
      res.status(200).json({
          message: 'Course updated',
          request: {
              type: 'GET',
              url: 'http://68.183.144.13:8080/courses/' + id
          }
      });
  }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
  });
});

router.delete("/:courseId", (req, res, next) => {
  const id = req.params.courseId;
  Course.remove({ courseId: id }).exec().then(result => {
    res.status(200).json({
      message: 'Course deleted',
      request: {
        type: 'GET',
        url: 'http://68.183.144.13:8080/courses',
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
    error: err
    });
  });
});

module.exports = router;
