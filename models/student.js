const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    studentId: {type: Number, required: true},
    fName: {type: String, required: true },
    lName: {type: String, required: true },
    department:{type: String, default: 'Computer Science'},
    courseId: String
});

studentSchema.virtual('course', {
    ref: 'Course',
    localField: 'courseId',
    foreignField: 'courseId',
    justOne: true
})

module.exports = mongoose.model('Student', studentSchema);

