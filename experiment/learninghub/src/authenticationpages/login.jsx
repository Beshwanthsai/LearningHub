import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ setIsAuthenticated }) {
    const navigate = useNavigate();

    function register() {
        let username = document.getElementById("un").value;
        let email = document.getElementById("mail").value;
        let password = document.getElementById("pass").value;
        let role = document.getElementById("sel1").value;

        if (!role || !username || !email || !password) {
            toast.error('Please fill all fields', {
                position: "top-right",
                theme: "colored",
                style: {
                    background: 'linear-gradient(to right, #ff6b6b, #ff8787)',
                    borderRadius: '10px'
                }
            });
            return;
        }

        role = parseInt(role, 10);

        axios.post("http://localhost:8083/register", 
            { username, email, password, role }, 
            { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
            
            localStorage.setItem('user', JSON.stringify({ username: username }));
            toast.success('Registration successful!', {
                position: "top-right",
                theme: "colored",
                style: {
                    background: 'linear-gradient(to right, #6ac1c5, #bda5ff)',
                    borderRadius: '10px'
                }
            });
            document.getElementById("signup_toggle").checked = false;
        })
        .catch((error) => {
            toast.error(error.response?.data || 'Registration failed', {
                position: "top-right",
                theme: "colored",
                style: {
                    background: 'linear-gradient(to right, #ff6b6b, #ff8787)',
                    borderRadius: '10px'
                }
            });
        });
    }

    function login() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("pass1").value;

        if (!username || !password) {
            toast.error('Please fill in all fields', {
                position: "top-right",
                theme: "colored",
                style: {
                    background: 'linear-gradient(to right, #ff6b6b, #ff8787)',
                    borderRadius: '10px'
                }
            });
            return;
        }

        axios.post("http://localhost:8083/verifyUser", 
            { username, password },
            { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
            console.log("Login response:", response.data);
            
            if (response.data.auth) {
                setIsAuthenticated(true);
                
                // Convert role to number if it's a string
                const userRole = typeof response.data.role === 'string' 
                    ? parseInt(response.data.role, 10) 
                    : response.data.role;
                
                console.log("User role:", userRole);
                
                // Store user data after successful login
                localStorage.setItem('user', JSON.stringify({ 
                    username: username,
                    role: userRole
                }));
                
                toast.success('Login successful! Redirecting...', {
                    position: "top-right",
                    theme: "colored",
                    style: {
                        background: 'linear-gradient(to right, #6ac1c5, #bda5ff)',
                        borderRadius: '10px'
                    }
                });

                // Direct navigation without timeout
                if (userRole === 1) {
                    console.log("Navigating to student dashboard");
                    navigate('/student-dashboard', { replace: true });
                } else if (userRole === 2) {
                    console.log("Navigating to instructor dashboard");
                    navigate('/instructor-dashboard', { replace: true });
                } else {
                    console.error("Unknown role:", userRole);
                    toast.error(`Role not recognized: ${userRole}`, {
                        position: "top-right",
                        theme: "colored"
                    });
                }
            } else {
                toast.error('Invalid credentials', {
                    position: "top-right",
                    theme: "colored"
                });
            }
        })
        .catch((error) => {
            console.error("Login error:", error);
            toast.error('Login failed', {
                position: "top-right",
                theme: "colored"
            });
        });
    }

    return (
        <div className="login-page">
            <ToastContainer />
            <nav className="navbar">
                <div className="logo">Learning Hub</div>
                <div className="nav-links">
                    <a href="#courses">Courses</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <button className="login-btn" onClick={() => navigate('/')}><b><i>Home</i></b></button>
                </div>
            </nav>

            <div className="container">
                <input id="signup_toggle" type="checkbox" />
                <div className="form">
                    <div className="form_front">
                        <div className="form_details">Login</div>
                        <input type="text" className="input" id="username" placeholder="Username" required />
                        <input type="password" className="input" id="pass1" placeholder="Password" required />
                        <button className="btn" onClick={login}>Login</button>
                        <div className="forgot-password">
                            <span onClick={() => navigate('/forgot-password')}>Forgot Password?</span>
                        </div>
                        <span className="switch">
                            Don't have an account?
                            <label htmlFor="signup_toggle" className="signup_tog">Sign Up</label>
                        </span>
                    </div>

                    <div className="form_back">
                        <div className="form_details">Sign Up</div>
                        <input type="text" className="input" placeholder="Name" id="un" required />
                        <input type="email" className="input" placeholder="Email" id="mail" required />
                        <select id="sel1" className="input" required>
                            <option value="">Select Role</option> 
                            <option value="1">Student</option>
                            <option value="2">Instructor</option>
                        </select>
                        <input type="password" className="input" placeholder="Password" id="pass" required />
                        <button className="btn" onClick={register}>Sign Up</button>
                        <span className="switch">
                            Already have an account?
                            <label htmlFor="signup_toggle" className="signup_tog">Login</label>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}