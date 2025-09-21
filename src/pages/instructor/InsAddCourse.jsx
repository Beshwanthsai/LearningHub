import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './InsAddCourse.css'; // Updated import to match CSS file name

const AddCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // For success/error styling

  useEffect(() => {
    // Fetch username from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { username: storedUsername } = JSON.parse(storedUser);
      setUsername(storedUsername || '');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const payload = {
        username,
        coursed: courseId,
        title,
        description,
        time: parseInt(time),
      };

      const response = await axios.post('http://localhost:8083/courses', payload);
      console.log(response.data);
      setMessage('Course added successfully!');
      setMessageType('success');
      setCourseId('');
      setTitle('');
      setDescription('');
      setTime(0);
    } catch (error) {
      console.error('Error adding course:', error);
      setMessage('Failed to add course. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="no-scroll-container">
      <nav className="instructor-navbar">
        <Link to="/" className="navbar-logo">Learning<span>Hub</span></Link>
        <div className="navbar-nav">
          <Link to="/instructor-dashboard" className="nav-item">Dashboard</Link>
          <Link to="/InsAddCourse" className="nav-item active">Add Courses</Link>
          <Link to="/InsAddCourseContent" className="nav-item">Course Content</Link>
        </div>
      </nav>

      <div className="dashboard-container fixed-height">
        <div className="add-course-container compact-container">
          <div className="form-container">
            <div className="form-header">
              <h2 className="styled-title">Add New Course</h2>
              <p className="form-subtext">Fill in the details below to create a new course</p>
            </div>
            
            {messageType && (
              <div className={`${messageType}-message`}>
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="courseId" className="required">Course ID</label>
                <input
                  type="text"
                  id="courseId"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  placeholder="Enter a unique course identifier"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="username">Instructor Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  readOnly
                  className="readonly"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="title" className="required">Course Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter an engaging course title"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description" className="required">Course Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a detailed description of the course"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="time" className="required">Course Duration (in hours)</label>
                <input
                  type="number"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Estimated time to complete the course"
                  required
                  min="0"
                  step="1"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => window.history.back()}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? 'Adding Course...' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Add inline styles to prevent scrolling */}
      <style jsx>{`
        .no-scroll-container {
          height: 100vh;
          overflow: hidden;
        }
        
        .fixed-height {
          height: calc(100vh - 61px); /* Subtract navbar height */
          overflow-y: auto;
          padding-bottom: 0;
        }
        
        .compact-container {
          margin: 0 auto;
          padding: 20px;
          max-height: 100%;
        }
        
        .form-container {
          max-height: calc(100vh - 150px);
          overflow-y: auto;
          padding-right: 10px; /* Add some padding for the scrollbar */
        }
        
        /* Make form elements more compact */
        .form-group {
          margin-bottom: 15px;
        }
        
        .form-group textarea {
          min-height: 80px;
        }
      `}</style>
    </div>
  );
};

export default AddCourse;