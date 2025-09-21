import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Landing from './Landing';
import Login from './authenticationpages/login';
import StudentDashboard from './pages/student/StudentDashboard';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import ForgotPassword from './authenticationpages/ForgotPassword';
// Import the new pages
import InsAddCourse from './pages/instructor/InsAddCourse';
import InsAddCourseContent from './pages/instructor/InsAddCourseContent';
import StudentCourseContent from './pages/student/StudentCourseContent';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const ProtectedRoute = ({ children }) => {
        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route 
                    path="/login" 
                    element={<Login setIsAuthenticated={setIsAuthenticated} />} 
                />
                <Route path="/course-content-view" element={<StudentCourseContent />} />
                <Route 
                    path="/forgot-password" 
                    element={<ForgotPassword />} 
                />

                {/* Protected Routes */}
                <Route 
                    path="/student-dashboard" 
                    element={
                        <ProtectedRoute>
                            <StudentDashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/instructor-dashboard" 
                    element={
                        <ProtectedRoute>
                            <InstructorDashboard />
                        </ProtectedRoute>
                    } 
                />
                {/* New Instructor Routes */}
                <Route 
                    path="/InsAddCourse" 
                    element={
                        <ProtectedRoute>
                            <InsAddCourse />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/InsAddCourseContent" 
                    element={
                        <ProtectedRoute>
                            <InsAddCourseContent />
                        </ProtectedRoute>
                    } 
                />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;