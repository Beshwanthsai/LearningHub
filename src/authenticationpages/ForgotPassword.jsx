import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import './ForgotPassword.css';

export default function ForgotPassword() {
    const navigate = useNavigate();

    const handleSubmit = () => {
        const username = document.getElementById("recovery-username").value;
        
        if (!username) {
            toast.error('Please enter username', {
                position: "top-right",
                theme: "colored",
                style: {
                    background: 'linear-gradient(to right, #ff6b6b, #ff8787)',
                    borderRadius: '10px'
                }
            });
            return;
        }

        axios.post("http://localhost:8083/forgot-password", { username })
            .then(response => {
                toast.success('Password reset instructions sent!', {
                    position: "top-right",
                    theme: "colored",
                    style: {
                        background: 'linear-gradient(to right, #6ac1c5, #bda5ff)',
                        borderRadius: '10px'
                    }
                });
                setTimeout(() => navigate('/login'), 2000);
            })
            .catch(error => {
                toast.error('Username not found', {
                    position: "top-right",
                    theme: "colored",
                    style: {
                        background: 'linear-gradient(to right, #ff6b6b, #ff8787)',
                        borderRadius: '10px'
                    }
                });
            });
    };

    return (
        <div className="forgot-password-container">
            <ToastContainer />
            <nav className="navbar">
                <div className="logo">Learning Hub</div>
                <button className="login-btn" onClick={() => navigate('/login')}>Back to Login</button>
            </nav>
            <div className="forgot-password-form">
                <h2>Forgot Password</h2>
                <p>Enter your username to recover your password</p>
                <input 
                    type="text" 
                    id="recovery-username" 
                    className="input" 
                    placeholder="Username" 
                    required 
                />
                <button className="btn" onClick={handleSubmit}>Get Password</button>
            </div>
        </div>
    );
}