import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Learning Hub</h2>
                </div>
                <nav className="sidebar-nav">
                    <a href="#" className="nav-item active">
                        <i className="fas fa-home"></i>Dashboard
                    </a>
                    <a href="#" className="nav-item">
                        <i className="fas fa-book"></i>My Courses
                    </a>
                    <a href="#" className="nav-item">
                        <i className="fas fa-tasks"></i>Assignments
                    </a>
                    <a href="#" className="nav-item">
                        <i className="fas fa-calendar"></i>Schedule
                    </a>
                    <a href="#" className="nav-item">
                        <i className="fas fa-cog"></i>Settings
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {/* Top Header */}
                <header className="dashboard-header">
                    <div className="search-bar">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search courses..." />
                    </div>
                    <div className="user-menu">
                        <div className="notifications">
                            <i className="fas fa-bell"></i>
                            <span className="badge">3</span>
                        </div>
                        <div className="user-profile">
                            <img src="profile-placeholder.jpg" alt="User" />
                            <span>John Doe</span>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="dashboard-content">
                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Enrolled Courses</h3>
                                <p className="stat-number">12</p>
                            </div>
                            <i className="fas fa-graduation-cap"></i>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>In Progress</h3>
                                <p className="stat-number">5</p>
                            </div>
                            <i className="fas fa-spinner"></i>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Completed</h3>
                                <p className="stat-number">7</p>
                            </div>
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Certificates</h3>
                                <p className="stat-number">4</p>
                            </div>
                            <i className="fas fa-certificate"></i>
                        </div>
                    </div>

                    {/* Course Progress */}
                    <div className="dashboard-grid">
                        <div className="progress-section">
                            <h2>Current Progress</h2>
                            <div className="course-progress">
                                <div className="course-card">
                                    <div className="course-info">
                                        <h3>Web Development</h3>
                                        <div className="progress-bar">
                                            <div className="progress" style={{width: '75%'}}></div>
                                        </div>
                                        <p>75% Complete</p>
                                    </div>
                                </div>
                                <div className="course-card">
                                    <div className="course-info">
                                        <h3>Data Science</h3>
                                        <div className="progress-bar">
                                            <div className="progress" style={{width: '45%'}}></div>
                                        </div>
                                        <p>45% Complete</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Tasks */}
                        <div className="tasks-section">
                            <h2>Upcoming Tasks</h2>
                            <div className="task-list">
                                <div className="task-item">
                                    <div className="task-info">
                                        <h4>JavaScript Assignment</h4>
                                        <p>Due Tomorrow</p>
                                    </div>
                                    <span className="task-status urgent">Urgent</span>
                                </div>
                                <div className="task-item">
                                    <div className="task-info">
                                        <h4>Python Quiz</h4>
                                        <p>Due in 3 days</p>
                                    </div>
                                    <span className="task-status">Upcoming</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;