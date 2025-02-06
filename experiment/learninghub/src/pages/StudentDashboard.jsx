import React from 'react';
import './Dashboard.css';

const StudentDashboard = () => {
    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Student Portal</h2>
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
                        <i className="fas fa-chart-line"></i>Progress
                    </a>
                </nav>
            </aside>
            <main className="main-content">
                {/* Content here */}
            </main>
        </div>
    );
};

export default StudentDashboard;