import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./InstructorDashboard.css";

const AddCourseContent = () => {
  const [courseId, setCourseId] = useState("");
  const [module, setModule] = useState(0);
  const [content, setContent] = useState("");
  const [link, setLink] = useState(""); // New state for the link
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContent = {
      courseId: courseId,
      module: module,
      content: content,
      link: link, // Adding the link field
    };

    axios
      .post("http://localhost:8083/course-content", newContent) // Adjust the URL based on your backend URL
      .then((response) => {
        setMessage("Course content added successfully!");
        // Clear the form fields
        setCourseId("");
        setModule(0);
        setContent("");
        setLink(""); // Clear the link field
      })
      .catch((error) => {
        setMessage("Error adding course content.");
        console.error("There was an error adding the course content!", error);
      });
  };

  return (
    <>
      <nav className="instructor-navbar styled-navbar">
        <Link to="/" className="navbar-logo styled-logo">
          Learning<span>Hub</span>
        </Link>
        <div className="navbar-nav styled-nav">
          <Link
            to="/instructor-dashboard"
            className="nav-item styled-nav-item"
          >
            Dashboard
          </Link>
          <Link to="/InsAddCourse" className="nav-item styled-nav-item">
            Add Courses
          </Link>
          <Link
            to="/InsAddCourseContent"
            className="nav-item active styled-nav-item"
          >
            Course Content
          </Link>
        </div>
      </nav>

      <div className="add-content-container styled-container">
        <h2 className="styled-title">Add Course Content</h2>
        <form onSubmit={handleSubmit} className="styled-form">
          <div className="styled-input-group">
            <label>Course ID:</label>
            <input
              type="text"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            />
          </div>
          <div className="styled-input-group">
            <label>Module:</label>
            <input
              type="number"
              value={module}
              onChange={(e) => setModule(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="styled-input-group">
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="styled-input-group">
            <label>Link (Optional):</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="http://example.com"
            />
          </div>
          <button type="submit" className="styled-button">
            Add Content
          </button>
        </form>
        {message && <p className="styled-message">{message}</p>}
      </div>
    </>
  );
};

export default AddCourseContent;