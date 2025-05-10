import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const StudentCourseContent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('courseId');
  let username = queryParams.get('username');

  const [contents, setContents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {

    if (!username) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.username) {
        username = storedUser.username;
      } else {
        setError('Username is missing. Please log in.');
        return;
      }
    }

    const fetchCourseContent = async () => {
      try {
        if (!courseId) {
          throw new Error('Course ID is missing.');
        }

        const response = await fetch(`http://localhost:8083/student-course-content?username=${username}&courseId=${courseId}`);
        if (!response.ok) throw new Error('Failed to fetch content');
        const data = await response.json();
        setContents(data);
        setError('');
      } catch (err) {
        setError(err.message);
        setContents([]);
      }
    };

    fetchCourseContent();
  }, [courseId, username]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Course Content for {courseId || 'Unknown Course'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {contents.length > 0 ? (
        <table border="1" cellPadding="10" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Course ID</th>
              <th>Module</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {contents.map(content => (
              <tr key={content.id}>
                <td>{content.id}</td>
                <td>{content.username}</td>
                <td>{content.courseId}</td>
                <td>{content.module}</td>
                <td>{content.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No content found.</p>
      )}
    </div>
  );
};

export default StudentCourseContent;