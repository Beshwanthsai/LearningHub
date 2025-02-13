import React from 'react';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Instructor Dashboard</h1>
        <div className="profile-section">
          <span className="welcome-text">Welcome, Instructor</span>
          <div className="profile-icon">
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <i className="fas fa-users"></i>
          <div className="stat-info">
            <h3>Total Students</h3>
            <p>250</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-book"></i>
          <div className="stat-info">
            <h3>Active Courses</h3>
            <p>12</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-chart-line"></i>
          <div className="stat-info">
            <h3>Average Rating</h3>
            <p>4.8</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-certificate"></i>
          <div className="stat-info">
            <h3>Certifications</h3>
            <p>85</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <div className="section-header">
            <h2>Recent Courses</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="courses-grid">
            {[1, 2, 3].map((course) => (
              <div key={course} className="course-card">
                <div className="course-image"></div>
                <div className="course-info">
                  <h3>Course Title {course}</h3>
                  <p>Students Enrolled: 45</p>
                  <div className="progress-bar">
                    <div className="progress" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>Recent Activities</h2>
          </div>
          <div className="activities-list">
            {[1, 2, 3, 4].map((activity) => (
              <div key={activity} className="activity-item">
                <div className="activity-icon">
                  <i className="fas fa-bell"></i>
                </div>
                <div className="activity-info">
                  <h4>New Student Enrollment</h4>
                  <p>John Doe enrolled in React Basics</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;