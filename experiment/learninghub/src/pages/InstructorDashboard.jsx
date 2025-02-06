import React from 'react';
import './Dashboard.css';

const InstructorDashboard = () => {
    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Instructor Portal</h2>
                </div>
                <nav className="sidebar-nav">
                    <a href="#" className="nav-item active">
                        <i className="fas fa-home"></i>Dashboard
                    </a>
                    <a href="#" className="nav-item">
                        <i className="fas fa-chalkboard"></i>My Classes
                    </a>
                    <a href="#" className="nav-item">
                        <i className="fas fa-users"></i>Students
                    </a>
                    <a href="#" className="nav-item">
                        <i className="fas fa-folder"></i>Course Material
                    </a>
                </nav>
            </aside>
            <main className="main-content">
                {/* Content here */}
            </main>
        </div>
    );
};

export default InstructorDashboard;