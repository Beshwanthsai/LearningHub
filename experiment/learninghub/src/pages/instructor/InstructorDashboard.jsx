import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const [username, setUsername] = useState('Instructor');
  const [uploadedCourses, setUploadedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const { username: storedUsername } = JSON.parse(userData);
      if (storedUsername) {
        setUsername(storedUsername);
        fetchUploadedCourses(storedUsername);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const fetchUploadedCourses = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8083/courses?username=${username}`);
      setUploadedCourses(response.data);
    } catch (error) {
      console.error('Error fetching uploaded courses:', error);
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/InsAddCourseContent?courseId=${courseId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <nav className="instructor-navbar styled-navbar">
        <Link to="/" className="navbar-logo styled-logo">Learning<span>Hub</span></Link>
        <div className="navbar-nav styled-nav">
          <Link to="/instructor-dashboard" className="nav-item active styled-nav-item">Dashboard</Link>
          <Link to="/InsAddCourse" className="nav-item styled-nav-item">Add Courses</Link>
          <Link to="/InsAddCourseContent" className="nav-item styled-nav-item">Course Content</Link>
        </div>
        <div className="nav-user styled-user">
          <div className="user-info styled-user-info">
            <i className="fas fa-user-circle"></i>
            <span>{username}</span>
          </div>
          <button className="nav-logout styled-logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-container styled-container">
        <div className="dashboard-header styled-header">
          <h1>Instructor Dashboard</h1>
        </div>

        <div className="uploaded-courses-section styled-section">
          <h2>Uploaded Courses</h2>
          {uploadedCourses.length > 0 ? (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Description</th>
                  <th>Duration (hours)</th>
                </tr>
              </thead>
              <tbody>
                {uploadedCourses.map((course) => (
                  <tr key={course.courseid}>
                    <td>{course.courseid}</td>
                    <td>{course.description}</td>
                    <td>{course.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="styled-message">No courses uploaded yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default InstructorDashboard;