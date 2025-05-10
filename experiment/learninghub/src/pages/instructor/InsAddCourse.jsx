import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './InsAddCourse.css';

const AddCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

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

    try {
      const payload = {
        username,
        courseid: courseId,
        title,
        description,
        time: parseInt(time),
      };

      const response = await axios.post('http://localhost:8083/courses', payload);
      console.log(response.data);
      setMessage('Course added successfully!');
      setCourseId('');
      setTitle('');
      setDescription('');
      setTime(0);
    } catch (error) {
      console.error('Error adding course:', error);
      setMessage('Failed to add course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav className="instructor-navbar styled-navbar">
        <Link to="/" className="navbar-logo styled-logo">Learning<span>Hub</span></Link>
        <div className="navbar-nav styled-nav">
          <Link to="/instructor-dashboard" className="nav-item styled-nav-item">Dashboard</Link>
          <Link to="/InsAddCourse" className="nav-item active styled-nav-item">Add Courses</Link>
          <Link to="/InsAddCourseContent" className="nav-item styled-nav-item">Course Content</Link>
        </div>
      </nav>

      <div className="add-course-container styled-container">
        <h2 className="styled-title">Add Course</h2>
        <form onSubmit={handleSubmit} className="styled-form">
          <div className="styled-input-group">
            <label htmlFor="courseId">Course ID:</label>
            <input
              type="text"
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            />
          </div>
          <div className="styled-input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              readOnly
            />
          </div>
          <div className="styled-input-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="styled-input-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="styled-input-group">
            <label htmlFor="time">Time (in hours):</label>
            <input
              type="number"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="styled-button" disabled={isLoading}>
            {isLoading ? 'Adding Course...' : 'Add Course'}
          </button>
        </form>

        {message && <p className="styled-message">{message}</p>}
      </div>
    </>
  );
};

export default AddCourse;