import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

const StudentCrud = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    address: '',
    class: ''
  });
  const [editingId, setEditingId] = useState(null);

  // 📌 Fetch all students (READ)
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };
  
  useEffect(() => {
    fetchStudents();
  }, []);

  // 📝 Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ➕ Add new student (CREATE)
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      fetchStudents(); // refresh list
      setFormData({ names: '', email: '', address: '', class: '' });
    } catch (err) {
      console.error('Error adding student:', err);
    }
  };

  // ✏️ Edit student - set data to form
  const handleEdit = (student) => {
    setEditingId(student._id);
    setFormData({
      names: student.names,
      email: student.email,
      address: student.address,
      class: student.class,
    });
  };

  // ✅ Update student (UPDATE)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${editingId}`, formData);
      fetchStudents();
      setEditingId(null);
      setFormData({ names: '', email: '', address: '', class: '' });
    } catch (err) {
      console.error('Error updating student:', err);
    }
  };

  // ❌ Delete student (DELETE)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  return (
    <div className="container">
      <h2>Student CRUD</h2>
      <form onSubmit={editingId ? handleUpdate : handleAdd}>
        <input name="names" placeholder="Name" value={formData.names} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input name="class" placeholder="Class" value={formData.class} onChange={handleChange} />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.names} ({student.email}) - {student.class}
            <button onClick={() => handleEdit(student)}>Edit</button>
            <button onClick={() => handleDelete(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentCrud;
