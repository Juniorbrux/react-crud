import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar';

function Card() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          {students.map((student, index) => (
            <div className="col-md-4" key={index}>
              <div className="card">
                <div className="card-body">
                <img src={student.image_path} className="card-img-top" alt="Card Image"/>
                  <p className="card-title"><strong>Names:</strong>{student.names}</p>
                  <p className="card-text"><strong>Email:</strong> {student.email}</p>
                  <p className="card-text"><strong>Class:</strong> {student.class}</p>
                  <p className="card-text"><strong>Address:</strong> {student.address}</p>
                  {/* <a href="#" className="btn btn-primary">More details</a> */}
                  <br></br>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Card;
