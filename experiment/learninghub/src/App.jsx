// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './authenticationpages/login'
// import Landing from './Landing'
// import Dashboard from './pages/Dashboard';
// function App() {
//   return (
//     //   <Router>
//     //       <Routes>
//     //           <Route path="/" element={<Landing />} />
//     //           <Route path="/login" element={<Login />} />
              
//     //       </Routes>
//     //   </Router>
//     <Dashboard/>
//   );
// }
// export default App
// 
// 
// 2nd modification

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Landing from './Landing';
// import Login from './authenticationpages/login';
// import Dashboard from './pages/Dashboard';
// import { useState } from 'react';

// function App() {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     // Protected Route Component
//     const ProtectedRoute = ({ children }) => {
//         if (!isAuthenticated) {
//             return <Navigate to="/login" />;
//         }
//         return children;
//     };

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Landing />} />
//                 <Route 
//                     path="/login" 
//                     element={<Login setIsAuthenticated={setIsAuthenticated} />} 
//                 />
//                 <Route 
//                     path="/dashboard" 
//                     element={
//                         <ProtectedRoute>
//                             <Dashboard />
//                         </ProtectedRoute>
//                     } 
//                 />
//             </Routes>
//         </Router>
//     );
// }

// export default App;


// 3rd modification

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Landing from './Landing';
import Login from './authenticationpages/login';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import './App.css';

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