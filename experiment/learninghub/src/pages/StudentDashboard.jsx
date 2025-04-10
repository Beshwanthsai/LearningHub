import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const StudentDashboard = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.username) {
                setUsername(user.username);
            } else {
                setUsername('Guest User'); 
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            setUsername('Guest User');
        }
    }, []);

    return (
        <div className="dashboard-container">
            <nav className="themed-navbar">
                <div className="logo">Learning Hub</div>
                <div className="profile-menu">
                    <span className="user-name">{username}</span>
                    <img className="avatar" src="/avatar.png" alt="Profile" />
                </div>
            </nav>

            <div className="dashboard-grid">
                <aside className="sidebar">
                    <div className="menu-items">
                        <a className="menu-item active">
                            <i className="fas fa-home"></i>
                            <span>Dashboard</span>
                        </a>
                        <a className="menu-item">
                            <i className="fas fa-book"></i>
                            <span>My Courses</span>
                        </a>
                        <a className="menu-item">
                            <i className="fas fa-certificate"></i>
                            <span>Certificates</span>
                        </a>
                        <a className="menu-item">
                            <i className="fas fa-chart-line"></i>
                            <span>Progress</span>
                        </a>
                    </div>
                </aside>

                <main className="main-content">
                    <div className="stats-container">
                        <div className="stat-card gradient-card">
                            <h3>Enrolled Courses</h3>
                            <p className="stat-number">12</p>
                        </div>
                        <div className="stat-card gradient-card">
                            <h3>Completed</h3>
                            <p className="stat-number">8</p>
                        </div>
                        <div className="stat-card gradient-card">
                            <h3>Certificates</h3>
                            <p className="stat-number">5</p>
                        </div>
                    </div>

                    <div className="courses-grid">
                        <div className="course-progress-section">
                            <h2>Current Progress</h2>
                            <div className="progress-card">
                                <h3>Web Development</h3>
                                <div className="progress-bar">
                                    <div className="progress" style={{width: '75%'}}></div>
                                </div>
                                <p>75% Complete</p>
                            </div>
                        </div>

                        <div className="recommended-courses">
                            <h2>Recommended For You</h2>
                            <div className="course-cards">
                                <div className="course-card">
                                    <div className="course-image"></div>
                                    <h3>Advanced JavaScript</h3>
                                    <p>Master modern JavaScript</p>
                                    <button className="themed-button">Enroll Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;