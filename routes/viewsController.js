const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');

router.get('/students', function(req,res){
    fetch('http://68.183.144.13:8080/students').then(result => result.json()).then(json => {
        res.render('students',{students: json.students}); 
    });
});

router.get('/student', function(req,res){
    let studentId = req.query.studentId;
    fetch('http://68.183.144.13:8080/students/'+studentId).then(result => result.json()).then(json => { 
        res.render('student', {student: json.student})
    });
});

router.get('/deleteStudent', function(req,res){
    let studentId = req.query.studentId;
    fetch('http://68.183.144.13:8080/students/'+studentId,{
        method: 'delete',        
        headers: { 'Content-Type': 'application/json' },
    }).then(result => result.json()).then(json =>{res.redirect('/registration/students')})
});

router.get('/newStudent', function(req,res){
    fetch('http://68.183.144.13:8080/courses').then(result => result.json()).then(json => {        
        res.render('newStudent',{courses: json.courses}); 
    });
});

router.post('/addStudent', function(req,res){
    body = req.body;
    console.log('hjvbjl');
    fetch('http://68.183.144.13:8080/students/',{
        method: 'post',
        body:   JSON.stringify(body),        
        headers: { 'Content-Type': 'application/json' },
    }).then(result => result.json()).then(json =>{res.redirect('/registration/students')})
});

//routes for courses

router.get('/courses', function(req,res){
    fetch('http://68.183.144.13:8080/courses').then(result => result.json()).then(json => {
        res.render('courses',{courses: json.courses}); 
    });
});

router.get('/course', function(req,res){
    let courseId = req.query.courseId;
    fetch('http://68.183.144.13:8080/courses/'+courseId).then(result => result.json()).then(json => { 
        res.render('course', {course: json.course})
    });
});

router.get('/deleteCourse', function(req,res){
    let courseId = req.query.courseId;
    fetch('http://68.183.144.13:8080/courses/'+courseId,{
        method: 'delete',        
        headers: { 'Content-Type': 'application/json' },
    }).then(result => result.json()).then(json =>{res.redirect('/registration/courses')})
});

router.get('/newCourse', function(req,res){      
    res.render('newCourse'); 
});

router.post('/addCourse', function(req,res){
    body = req.body;
    fetch('http://68.183.144.13:8080/courses/',{
        method: 'post',
        body:   JSON.stringify(body),        
        headers: { 'Content-Type': 'application/json' },
    }).then(result => result.json()).then(json =>{res.redirect('/registration/courses')})
});

router.get('/', function(req,res){
    res.render('index');
})


module.exports = router;