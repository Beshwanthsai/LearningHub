import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisteredCoursesViewer = () => {
  const [username, setUsername] = useState('');
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username);
    } else {
      setError('Username is missing. Please log in.');
    }
  }, []);

  useEffect(() => {

    const fetchCourses = async () => {
      try {
        console.log('Fetching courses for username:', username);
        

        const response = await fetch(`http://localhost:8083/registered-courses?username=${username}`);
        if (!response.ok) throw new Error('Failed to fetch registered courses');
        let data = await response.json();
        console.log('API response data:', data);
        

        const hasAllCourseIds = data.every(course => course.courseId);
        if (!hasAllCourseIds) {
          try {

            const allCoursesResponse = await fetch('http://localhost:8083/all-courses');
            if (allCoursesResponse.ok) {
              const allCourses = await allCoursesResponse.json();
              console.log('All courses data:', allCourses);
              

              const courseIdMap = {};
              allCourses.forEach(course => {
                if (course.courseId && course.courseHead) {
                  courseIdMap[course.courseHead] = course.courseId;
                }
              });
              

              data = data.map(regCourse => {
                if (!regCourse.courseId && regCourse.courseHead && courseIdMap[regCourse.courseHead]) {
                  return { ...regCourse, courseId: courseIdMap[regCourse.courseHead] };
                }
                return regCourse;
              });
            }
          } catch (e) {
            console.error('Error fetching all courses:', e);
          }
        }
        

        localStorage.setItem('userCourses', JSON.stringify(data));
        
        setCourses(data);
        setError('');
      } catch (err) {
        console.error('Error in fetchCourses:', err);
        setError(err.message);
        setCourses([]);
      }
    };

    if (username) {
      fetchCourses();
    }
  }, [username]);
  

  useEffect(() => {
    console.log('Current courses state:', courses);
  }, [courses]);

  const handleViewContent = (courseId) => {
    navigate(`/course-content-view?courseId=${courseId}&username=${username}`);
  };


  useEffect(() => {
    if (courses.length > 0) {
      console.log('Course data sample:', courses[0]);
    }
  }, [courses]);

  return (
    <div className="styled-section">
      <h2 className="styled-title">My Registered Courses</h2>
      {error && <p className="error-message">{error}</p>}

      {courses.length > 0 ? (
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-info">
                <h3>{course.courseHead}</h3>
                <div className="course-meta">
                  <span><strong>Course ID:</strong> {course.courseId}</span>
                  <div className="progress-container">
                    <div className="progress-label">
                      <span>Progress</span>
                      <span>{course.percentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                <button 
                  className="view-course-button"
                  onClick={() => handleViewContent(course.courseId)}
                >
                  View Course Content
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !error && (
          <div className="empty-courses">
            <p>No registered courses found.</p>
            <p>Explore our course catalog to start your learning journey!</p>
          </div>
        )
      )}

      <style jsx>{`
        .styled-section {
          padding: 30px;
          color:white;
          background:white ;
          border-radius: 12px;
          margin: 20px;
        }

        .styled-title {
          font-size: 28px;
          color:rgb(33, 118, 203);
          margin-bottom: 25px;
          text-align: center;
          border-bottom: 2px solid #6ac1c5;
          padding-bottom: 10px;
          display: inline-block;
        }

        .error-message {
          color: #f44336;
          background: rgba(244, 67, 54, 0.1);
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .course-card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-top: 4px solid #6ac1c5;
          padding: 20px;
        }

        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .course-info h3 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 18px;
        }

        .course-meta {
          margin-bottom: 20px;
        }

        .course-meta span {
          display: block;
          margin-bottom: 10px;
          color: #555;
        }

        .progress-container {
          margin-top: 15px;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          font-size: 14px;
          color: #666;
        }

        .progress-bar {
          height: 8px;
          background-color: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #6ac1c5, #bda5ff);
          border-radius: 4px;
        }

        .view-course-button {
          background: linear-gradient(135deg, #6ac1c5, #bda5ff);
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          width: 100%;
          margin-top: 10px;
        }

        .view-course-button:hover {
          box-shadow: 0 4px 12px rgba(106, 193, 197, 0.3);
          transform: translateY(-2px);
        }

        .empty-courses {
          background: white;
          padding: 30px;
          text-align: center;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .empty-courses p:first-child {
          font-size: 18px;
          margin-bottom: 10px;
          color: #2c3e50;
        }

        .empty-courses p:last-child {
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default RegisteredCoursesViewer;