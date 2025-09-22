import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Landing from './Landing';
import Login from './authenticationpages/login';
import StudentDashboard from './pages/student/StudentDashboard';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import ForgotPassword from './authenticationpages/ForgotPassword';
import InsAddCourse from './pages/instructor/InsAddCourse';
import InsAddCourseContent from './pages/instructor/InsAddCourseContent';
import StudentCourseContent from './pages/student/StudentCourseContent';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route 
                    path="/login" 
                    element={
                        isAuthenticated 
                        ? <Navigate to="/student-dashboard" /> 
                        : <Login setIsAuthenticated={setIsAuthenticated} />
                    } 
                />
                <Route path="/course-content-view" element={<StudentCourseContent />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Routes */}
                <Route 
                    path="/student-dashboard" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <StudentDashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/instructor-dashboard" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <InstructorDashboard />
                        </ProtectedRoute>
                    } 
                />
                {/* New Instructor Routes */}
                <Route 
                    path="/instructor/add-course" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <InsAddCourse />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/instructor/add-course-content" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
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
