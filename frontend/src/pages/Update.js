import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import { useParams, useNavigate } from 'react-router-dom';

function Registrations() {
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    address: '',
    class: '',
    image_path: '' // Existing image URL or null if new image is uploaded
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the student ID from URL parameters
  const navigate = useNavigate(); // For navigation after successful update

  useEffect(() => {
    if (id) {
      // Fetch student data
      fetch(`http://localhost:5000/api/students/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch student data.');
          }
          return response.json();
        })
        .then(data => {
          setFormData({
            names: data.names || '',
            email: data.email || '',
            address: data.address || '',
            class: data.class || '',
            image_path: data.image_path || '',
          });
        })
        .catch(error => {
          console.error('Error fetching student data:', error);
          setError('Failed to load student data.');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.names || !formData.email || !formData.address || !formData.class) {
      setError('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let imageUrl = formData.image_path;

      // If a new image is selected, upload it first
      if (formData.image_path instanceof File) {
        const imageData = new FormData();
        imageData.append('image', formData.image_path);

        const imageUploadResponse = await fetch('http://localhost:5000/picture/upload', {
          method: 'POST',
          body: imageData,
        });

        if (!imageUploadResponse.ok) {
          const errorData = await imageUploadResponse.json();
          throw new Error(errorData.message || 'Failed to upload the image.');
        }

        const imageUploadResult = await imageUploadResponse.json();
        imageUrl = imageUploadResult.url; // Use the uploaded image URL
      }

      // Update student data
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image_path: imageUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update the student.');
      }

      alert('Update successful!');
      navigate('/home'); // Redirect to another page on success
    } catch (error) {
      console.error('Error submitting the form:', error);
      setError(error.message || 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h4>Update Student Information</h4>
              </div>
              <div className="card-body">
                <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="names" className="form-label">Names</label>
                    <input
                      type="text"
                      className="form-control"
                      id="names"
                      name="names"
                      value={formData.names}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter the student's name.</div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter a valid email.</div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please provide the student's address.</div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="class" className="form-label">Class</label>
                    <input
                      type="text"
                      className="form-control"
                      id="class"
                      name="class"
                      value={formData.class}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please specify the class.</div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Upload Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image_path" // Handle the file input for the image
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">Please upload an image.</div>
                  </div>

                  <div className="">
                    <button className="btn btn-primary col-md-12" type="submit" disabled={loading}>
                      {loading ? <><span className="spinner-border spinner-border-sm"></span> Loading...</> : 'Update'}
                    </button>
                  </div>

                  {error && (
                    <div className="mb-3">
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registrations;
