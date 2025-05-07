const Student = require('../models/registermodels');

exports.getAllStudents = (req, res) => {
    Student.getAll((err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.getStudentById = (req, res) => {
    const id = req.params.id;
    Student.getById(id, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

exports.createStudent = (req, res) => {
    const studentData = req.body;
    Student.create(studentData, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student have been Registered', studentId: result.insertId });
    }); 
};

exports.updateStudent = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    Student.update(id, updatedData, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student updated' });
    });
};

exports.deleteStudent = (req, res) => {
    const id = req.params.id;
    Student.delete(id, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student deleted' });
    });
};



