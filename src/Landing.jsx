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
                        <img
                            src="/fullstack.jpg"
                            alt="Full Stack Application Development"
                            onError={(e) => {
                                e.target.src = 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                            }}
                        />
                        <h3>Full Stack Development</h3>
                        <p>Master modern web technologies</p>
                        <button onClick={handleGetStarted}>Enroll Now</button>
                    </div>
                    <div className="course-card">
                        <img
                            src="/security.jpg"
                            alt="Network Protocols and Security"
                            onError={(e) => {
                                e.target.src = 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                            }}
                        />
                        <h3>Network Protocols & Security</h3>
                        <p>Learn cybersecurity fundamentals</p>
                        <button onClick={handleGetStarted}>Enroll Now</button>
                    </div>
                    <div className="course-card">
    <img
        src="/dbms.jpg"
        alt="Database Management Systems"
        onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/17489150/pexels-photo-17489150/free-photo-of-light-on-computer-hardware.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
    />
    <h3>Database Management Systems</h3>
    <p>Master SQL and NoSQL databases</p>
    <button onClick={handleGetStarted}>Enroll Now</button>
</div>
                    <div className="course-card">
                        <img
                            src="/os.jpg"
                            alt="Operating Systems"
                            onError={(e) => {
                                e.target.src = 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                            }}
                        />
                        <h3>Operating Systems</h3>
                        <p>Understanding OS fundamentals</p>
                        <button onClick={handleGetStarted}>Enroll Now</button>
                    </div>
                    <div className="course-card">
                        <img
                            src="/aiml.jpg"
                            alt="AI and Machine Learning"
                            onError={(e) => {
                                e.target.src = 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                            }}
                        />
                        <h3>AI & Machine Learning</h3>
                        <p>Explore ML algorithms & AI concepts</p>
                        <button onClick={handleGetStarted}>Enroll Now</button>
                    </div>
                    <div className="course-card">
                        <img
                            src="/dsa.jpg"
                            alt="Data Structures and Algorithms"
                            onError={(e) => {
                                e.target.src = 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                            }}
                        />
                        <h3>Data Structures & Algorithms</h3>
                        <p>Master DSA concepts</p>
                        <button onClick={handleGetStarted}>Enroll Now</button>
                    </div>
                    <div className="course-card">
                        <img
                            src="/frontend.jpg"
                            alt="Frontend Frameworks"
                            onError={(e) => {
                                e.target.src = 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                            }}
                        />
                        <h3>Frontend Frameworks</h3>
                        <p>React, Angular, and Vue.js</p>
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
                        <p>Email: learninghubfsad@gmail.com</p>
                        <p>Phone: (+91) 9491578736</p>
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
                    <p>&copy; 2025 Learning Hub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;