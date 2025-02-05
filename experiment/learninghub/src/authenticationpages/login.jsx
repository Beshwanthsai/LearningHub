import './login.css';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate('/dashboard');
    };
    
    return (
        <div className="login-page">
            <nav className="navbar">
                <div className="logo">Learning Hub</div>
                <div className="nav-links">
                    <a href="#courses">Courses</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <button className="login-btn" onClick={() => navigate('/')}>Home</button>
                </div>
            </nav>

            <div className="container">
                <input id="signup_toggle" type="checkbox" />
                <div className="form">
                    <div className="form_front">
                        <div className="form_details">Login</div>
                        <input type="text" className="input" placeholder="Username" required />
                        <input type="password" className="input" placeholder="Password" required />
                        <button className="btn">Login</button>
                        <span className="switch">
                            Don't have an account?
                            <label htmlFor="signup_toggle" className="signup_tog">Sign Up</label>
                        </span>
                    </div>
                    <div className="form_back">
                        <div className="form_details">Sign Up</div>
                        <input type="text" className="input" placeholder="Name" required />
                        {/* <input type="email" className="input" placeholder="Email" required /> */}
                        <select className="input" required>
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                        </select>
                        <input type="password" className="input" placeholder="Password" required />
                        <button className="btn">Sign Up</button>
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