import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div className="landing-page">
            <section className="hero">
                <nav className="navbar">
                    <div className="logo">Learning Hub</div>
                    <div className="nav-links">
                        <a href="#courses">Courses</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                        <button className="login-btn" onClick={() => navigate('/login')}><b><i>Login</i></b></button>
                    </div>
                </nav>
                <div className="hero-content">
                    <h1>Start Your Learning Journey Today</h1>
                    <h1>Welcome to Learning Hub</h1>
                    <p>Access thousands of courses from expert instructors worldwide</p>
                    <button className="cta-btn" onClick={handleGetStarted}>Get Started</button>
                </div>
            </section>

            <section className="features" id="about">
                <h2>Why Choose Learning Hub?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <i className="fas fa-laptop-code"></i>
                        <h3>Expert Instructors</h3>
                        <p>Learn from industry professionals</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-clock"></i>
                        <h3>Flexible Learning</h3>
                        <p>Study at your own pace</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-certificate"></i>
                        <h3>Certificates</h3>
                        <p>Earn recognized certificates</p>
                    </div>
                </div>
            </section>

            <section className="courses" id="courses">
                <h2>Popular Courses</h2>
                <div className="course-grid">
                    <div className="course-card">
                        <img src="/web-dev.jpg" alt="Full Stack Application Development" />
                        <h3>Full Stack Application Development</h3>
                        <p>Master modern web technologies</p>
                        <button onClick={handleGetStarted}>Enroll Now</button>
                    </div>
                    <div className="course-card">
                        <img src="/data-science.jpg" alt="Design Analysis Algorithms" />
                        <h3>Design Analysis Algorithms</h3>
                        <p>Learn data analytics and ML</p>
                        <button onClick={handleGetStarted}>Enroll Now</button>
                    </div>
                    <div className="course-card">
                        <img src="/mobile-dev.jpg" alt="Data Structures" />
                        <h3>Data Structures</h3>
                        <p>Get expertise in Data Structures</p>
                        <button onClick={handleGetStarted}>Enroll Now</button>
                    </div>
                </div>
            </section>

            <section className="cta">
                <h2>Ready to Start Learning?</h2>
                <p>Join thousands of students already learning on Learning Hub</p>
                <button className="cta-btn" onClick={handleGetStarted}>Join Now</button>
            </section>

            <footer className="footer" id="contact">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Learning Hub</h4>
                        <p>Empowering learners worldwide</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <a href="#courses">Courses</a>
                        <a href="#about">About Us</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <p>Email: info@learninghub.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                    <div className="footer-section">
                        <h4>Follow Us</h4>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Learning Hub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;