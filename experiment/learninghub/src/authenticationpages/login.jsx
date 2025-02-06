import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate('/dashboard');
    };

    function register() {
        let username = document.getElementById("un").value;
        let email = document.getElementById("mail").value;
        let password = document.getElementById("pass").value;
        let role = document.getElementById("sel1").value; // Get role
    
        console.log("Sending data:", { username, email, password, role });
    
        // Ensure a valid role is selected
        if (!role) {
            console.error("Invalid role selected.");
            document.getElementById("result").innerHTML = "Please select a valid role.";
            return;
        }
    
        // Convert role to an integer
        role = parseInt(role, 10);
    
        // Ensure other fields are not empty
        if (!username || !email || !password) {
            console.error("All fields are required.");
            document.getElementById("result").innerHTML = "Please fill all fields.";
            return;
        }
    
        // Send POST request
        axios.post("http://localhost:8083/register", 
            { username, email, password, role }, 
            { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
            document.getElementById("result").innerHTML = res.data;
            console.log("Response:", res.data);
        })
        .catch((error) => {
            console.error("Error:", error.response ? error.response.data : error);
            document.getElementById("result").innerHTML = 
                error.response ? error.response.data : "Registration failed.";
        });
    }
    
    
    
    
    return (
        <div className="login-page">
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
                        <input type="text" className="input" placeholder="Name" id="un" required />
                        <input type="email" className="input" placeholder="Email" id="mail" required />
                        <select id="sel1" className="input" required>
                            <option value="">Select Role</option> 
                            <option value="1">Student</option>
                            <option value="2">Instructor</option>
                        </select>

                        <input type="password" className="input" placeholder="Password" id="pass" required />
                        <button className="btn" onClick={register} >Sign Up</button>
                        <div id="result"></div>
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