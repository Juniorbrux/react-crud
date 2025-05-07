import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch student data from the API
    fetch('http://localhost:5000/api/students/')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching student data:', error));
  }, []);

  const handleEdit = (id) => {
    
    // Navigate to the update page with the student's ID
    navigate(`/update/${id}`);
    
    
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete student.');
        }
        // Remove the deleted student from the state
        setStudents(students.filter(student => student.st_id !== id));
        alert('Student deleted successfully!');
      })
      .catch(error => console.error('Error deleting student:', error));
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="home">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/registration">
                    Registration
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="card">
                    View
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
            </div>

            <h2>Student Information</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Class</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.st_id}>
                      <td>{student.st_id}</td>
                      <td>{student.names}</td>
                      <td>{student.email}</td>
                      <td>{student.class}</td>
                      <td>{student.address}</td>
                      <td>
                       <button
                          className="btn btn-link"
                          onClick={() => handleEdit(student.st_id)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        &nbsp;&nbsp;
                        <button
                          className="btn btn-link text-danger"
                          onClick={() => handleDelete(student.st_id)}
                        >
                          <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Home;
