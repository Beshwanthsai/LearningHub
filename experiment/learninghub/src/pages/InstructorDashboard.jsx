import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const [username, setUsername] = useState('Instructor');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [materials, setMaterials] = useState([
    { id: 1, title: 'React Basics PDF', type: 'pdf', course: 'React Fundamentals' },
    { id: 2, title: 'JavaScript Variables', type: 'video', course: 'JavaScript 101' },
    { id: 3, title: 'Additional Resources', type: 'link', course: 'React Fundamentals' },
  ]);
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'React Components', deadline: '2023-12-15', course: 'React Fundamentals', submissions: 12 },
    { id: 2, title: 'JavaScript Functions', deadline: '2023-12-10', course: 'JavaScript 101', submissions: 8 },
  ]);
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', courses: 2, progress: 75, quizAvg: 85 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', courses: 1, progress: 60, quizAvg: 92 },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', courses: 3, progress: 45, quizAvg: 78 },
    { id: 4, name: 'Sara Wilson', email: 'sara@example.com', courses: 2, progress: 90, quizAvg: 96 },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const { username: storedUsername } = JSON.parse(userData);
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } else {
      // Redirect to login if no user data found
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleMaterialUpload = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const type = e.target.type.value;
    const course = e.target.course.value;
    
    // In a real app, here you would handle the actual file upload to a server
    
    setMaterials([...materials, {
      id: materials.length + 1,
      title,
      type,
      course
    }]);
    
    setShowUploadForm(false);
    // Reset form
    e.target.reset();
  };

  const handleAssignmentCreate = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const deadline = e.target.deadline.value;
    const course = e.target.course.value;
    
    // In a real app, here you would handle the actual file upload to a server
    
    setAssignments([...assignments, {
      id: assignments.length + 1,
      title,
      description,
      deadline,
      course,
      submissions: 0
    }]);
    
    setShowAssignmentForm(false);
    // Reset form
    e.target.reset();
  };

  return (
    <div className="dashboard-container">
      {/* Header section with user welcome */}
      <div className="dashboard-header">
        <h1>Instructor Dashboard</h1>
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`} 
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-tab ${activeTab === 'materials' ? 'active' : ''}`} 
            onClick={() => setActiveTab('materials')}
          >
            Materials
          </button>
          <button 
            className={`nav-tab ${activeTab === 'assignments' ? 'active' : ''}`} 
            onClick={() => setActiveTab('assignments')}
          >
            Assignments
          </button>
          <button 
            className={`nav-tab ${activeTab === 'students' ? 'active' : ''}`} 
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
        </div>
        <div className="profile-section align-items-center">
          <span className="welcome-text">Welcome, {username}</span>
          <div className="profile-icon">
            <i className="fas fa-user-circle"></i>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <>
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
        </>
      )}

      {/* Learning Materials Tab */}
      {activeTab === 'materials' && (
        <div className="content-section">
          <div className="section-header">
            <h2>Learning Materials</h2>
            <button className="view-all-btn" onClick={() => setShowUploadForm(!showUploadForm)}>
              {showUploadForm ? 'Cancel' : 'Upload Material'}
            </button>
          </div>
          
          {/* Upload Form */}
          {showUploadForm && (
            <div className="form-container">
              <form onSubmit={handleMaterialUpload}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title" name="title" required />
                </div>
                
                 <div className="form-group">
                  <label htmlFor="type">Material Type</label>
                  <select id="type" name="type" required>
                    <option value="">Select Type</option>
                    <option value="pdf">PDF</option>
                    <option value="video">Video</option>
                    <option value="link">External Link</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="course">Course</label>
                  <select id="course" name="course" required>
                    <option value="">Select Course</option>
                    <option value="React Fundamentals">React Fundamentals</option>
                    <option value="JavaScript 101">JavaScript 101</option>
                    <option value="HTML & CSS Basics">HTML & CSS Basics</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="file">Upload File</label>
                  <input type="file" id="file" name="file" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="link">External Link (Optional)</label>
                  <input type="url" id="link" name="link" placeholder="https://example.com/resource" />
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn-primary">Upload Material</button>
                  <button type="button" className="btn-secondary" onClick={() => setShowUploadForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
          
          {/* Materials List */}
          <div className="materials-list">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.id}>
                    <td>{material.title}</td>
                    <td>
                      <span className={`material-type ${material.type}`}>
                        {material.type === 'pdf' && <i className="fas fa-file-pdf"></i>}
                        {material.type === 'video' && <i className="fas fa-video"></i>}
                        {material.type === 'link' && <i className="fas fa-link"></i>}
                        {material.type}
                      </span>
                    </td>
                    <td>{material.course}</td>
                    <td>
                      <button className="btn-icon"><i className="fas fa-edit"></i></button>
                      <button className="btn-icon"><i className="fas fa-trash"></i></button>
                      <button className="btn-icon"><i className="fas fa-download"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <div className="content-section">
          <div className="section-header">
            <h2>Assignments</h2>
            <button className="view-all-btn" onClick={() => setShowAssignmentForm(!showAssignmentForm)}>
              {showAssignmentForm ? 'Cancel' : 'Create Assignment'}
            </button>
          </div>
          
          {/* Assignment Creation Form */}
          {showAssignmentForm && (
            <div className="form-container">
              <form onSubmit={handleAssignmentCreate}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title" name="title" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea id="description" name="description" rows="4" required></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="deadline">Deadline</label>
                  <input type="date" id="deadline" name="deadline" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="course">Course</label>
                  <select id="course" name="course" required>
                    <option value="">Select Course</option>
                    <option value="React Fundamentals">React Fundamentals</option>
                    <option value="JavaScript 101">JavaScript 101</option>
                    <option value="HTML & CSS Basics">HTML & CSS Basics</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="file">Attachment (Optional)</label>
                  <input type="file" id="file" name="file" />
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn-primary">Create Assignment</button>
                  <button type="button" className="btn-secondary" onClick={() => setShowAssignmentForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
          
          {/* Assignments List */}
          <div className="assignments-list">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Course</th>
                  <th>Deadline</th>
                  <th>Submissions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td>{assignment.title}</td>
                    <td>{assignment.course}</td>
                    <td>{assignment.deadline}</td>
                    <td>{assignment.submissions} students</td>
                    <td>
                      <button className="btn-icon"><i className="fas fa-eye"></i></button>
                      <button className="btn-icon"><i className="fas fa-edit"></i></button>
                      <button className="btn-icon"><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="content-section">
          <div className="section-header">
            <h2>Enrolled Students</h2>
            <div className="search-container">
              <input type="text" placeholder="Search students..." className="search-input" />
              <button className="search-btn"><i className="fas fa-search"></i></button>
            </div>
          </div>
          
          {/* Students Performance Table */}
          <div className="student-performance">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Enrolled Courses</th>
                  <th>Progress</th>
                  <th>Quiz Average</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.courses} courses</td>
                    <td>
                      <div className="progress-bar">
                        <div className="progress" style={{width: `${student.progress}%`}}></div>
                      </div>
                      <span className="progress-text">{student.progress}%</span>
                    </td>
                    <td>{student.quizAvg}%</td>
                    <td>
                      <button className="btn-icon"><i className="fas fa-eye"></i></button>
                      <button className="btn-icon"><i className="fas fa-envelope"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;