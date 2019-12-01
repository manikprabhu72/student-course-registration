const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');

router.get('/student', function(req,res){
    fetch('http://68.183.144.13:8080/students').then(result => result.json()).then(json => {
        res.render('students',{students: json.students}); 
    });
});

router.get('/student/:studentId', function(req,res){
    let studentId = req.params.studentId;
    fetch('http://68.183.144.13:8080/students/'+studentId).then(result => result.json()).then(json => { 
        res.render('student', {student: json.student})
    });
});

router.delete('/student/:studentId', function(req,res){
    console.log('rftgyhuji');
    let studentId = req.params.studentId;
    fetch('http://68.183.144.13:8080/students/'+studentId,{
        method: 'delete',        
        headers: { 'Content-Type': 'application/json' },
    }).then(result => result.json()).then(result =>{res.status(200).json(result)})
});

router.get('/newStudentForm', function(req,res){
    fetch('http://68.183.144.13:8080/courses').then(result => result.json()).then(json => {        
        res.render('newStudent',{courses: json.courses}); 
    });
});

router.post('/student', function(req,res){
    body = req.body;
    console.log('hjvbjl');
    fetch('http://68.183.144.13:8080/students/',{
        method: 'post',
        body:   JSON.stringify(body),        
        headers: { 'Content-Type': 'application/json' },
    }).then(result => result.json()).then(json =>{res.redirect('/student')})
});

//routes for courses

router.get('/course', function(req,res){
    fetch('http://68.183.144.13:8080/courses').then(result => result.json()).then(json => {
        res.render('courses',{courses: json.courses}); 
    });
});

router.get('/course/:courseId', function(req,res){
    let courseId = req.params.courseId;
    fetch('http://68.183.144.13:8080/courses/'+courseId).then(result => result.json()).then(json => { 
        res.render('course', {course: json.course})
    });
});

router.delete('/course/:courseId', function(req,res){
    let courseId = req.params.courseId;
    fetch('http://68.183.144.13:8080/courses/'+courseId,{
        method: 'delete',        
        headers: { 'Content-Type': 'application/json' },
    }).then(result => result.json()).then(json =>{res.redirect('/course')})
});

router.get('/newCourseForm', function(req,res){      
    res.render('newCourse'); 
});

router.post('/course', function(req,res){
    body = req.body;
    fetch('http://68.183.144.13:8080/courses/',{
        method: 'post',
        body:   JSON.stringify(body),        
        headers: { 'Content-Type': 'application/json' },
    }).then(result => result.json()).then(json =>{res.redirect('/course')})
});

router.get('/', function(req,res){
    res.render('index');
})


module.exports = router;