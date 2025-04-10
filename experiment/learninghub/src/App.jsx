import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Landing from './Landing';
import Login from './authenticationpages/login';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import ForgotPassword from './authenticationpages/ForgotPassword';


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

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;