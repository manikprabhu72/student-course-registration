const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    courseId: {type: Number, required: true},
    name: {type: String, required: true },
    professor: {type: String, required: true },
    department:{type: String, default: 'Computer Science'},
    credits:{type: Number, default: 3}
});


module.exports = mongoose.model('Course', courseSchema);

