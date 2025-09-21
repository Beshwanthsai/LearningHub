import React, { useState, useEffect } from 'react';
import MyCourses from './MyCourses';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';
import Chatbot from '../Chatbot'; // Import the Chatbot component

const statsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 0',
    gap: '20px',
};

const statCardStyle = {
    flex: 1,
    background: 'linear-gradient(135deg, #3f51b5, #5c6bc0)',
    color: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
};

const statValueStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '10px 0',
};

// Register Chart.js components for the stats containeer
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentDashboard = () => {
    const [username, setUsername] = useState('');
    const [activeSection, setActiveSection] = useState('dashboard');
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [quizResult, setQuizResult] = useState(null);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [completedModules, setCompletedModules] = useState({});
    const [certificates, setCertificates] = useState([]);
    const [viewingModules, setViewingModules] = useState(null);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Add state for chatbot visibility
    const [chatbotApiKey, setChatbotApiKey] = useState('');
    const [showApiKeyForm, setShowApiKeyForm] = useState(false);
    // Add assignments state
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [assignmentAnswers, setAssignmentAnswers] = useState({});
    const [assignmentResult, setAssignmentResult] = useState(null);
    const [submittedAssignments, setSubmittedAssignments] = useState({});

    // Function to handle API key submission
    const handleApiKeySubmit = (key) => {
        // Store API key in localStorage
        localStorage.setItem('geminiApiKey', key);
        setChatbotApiKey(key);
        setShowApiKeyForm(false);
    };

    // Check for saved API key on component mount
    useEffect(() => {
        const savedApiKey = localStorage.getItem('geminiApiKey');
        if (savedApiKey) {
            setChatbotApiKey(savedApiKey);
        }
    }, []);

    
    // Fix error by providing correct model path for the Gemini API
    const getModelEndpoint = () => {
        // Updated to use the latest model name format and API version
        return 'https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent';
    };
    
    // Toggle chatbot with API key check
    const toggleChatbot = () => {
        // If chatbot is currently closed and we're about to open it
        if (!isChatbotOpen) {
            // If no API key is saved, show the form instead
            if (!chatbotApiKey) {
                setShowApiKeyForm(true);
            }
        }
        setIsChatbotOpen(!isChatbotOpen);
    };

    const coursesData = [
        {
            id: 1,
            title: 'Web Development Fundamentals',
            description: 'Master HTML, CSS, and JavaScript',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 75,
            instructor: 'Prof. Sarah Johnson',
            modules: [
                {
                    id: 1,
                    title: 'HTML Basics',
                    description: 'Learn the fundamentals of HTML',
                    resources: [
                        { id: 1, title: 'HTML Cheatsheet', type: 'pdf', url: '#' },
                        { id: 2, title: 'HTML Tutorial Video', type: 'video', url: '#' }
                    ],
                    videos: [
                        { id: 101, title: 'HTML Document Structure', url: 'https://www.youtube.com/embed/UB1O30fR-EE', duration: '12:45' },
                        { id: 102, title: 'HTML Tags and Elements', url: 'https://www.youtube.com/embed/DPnqb74Smug', duration: '15:20' },
                        { id: 103, title: 'Forms and Input Elements', url: 'https://www.youtube.com/embed/fNcJuPIZ2WE', duration: '18:30' }
                    ],
                    quiz: {
                        id: 101,
                        title: 'HTML Fundamentals Quiz',
                        questions: [
                            {
                                id: 1,
                                question: 'What does HTML stand for?',
                                options: [
                                    'Hyper Text Markup Language',
                                    'High Tech Modern Language',
                                    'Hyperlinks and Text Markup Language',
                                    'Home Tool Markup Language'
                                ],
                                correctAnswer: 0
                            },
                            {
                                id: 2,
                                question: 'Which tag is used for creating a hyperlink?',
                                options: ['<a>', '<h>', '<p>', '<link>'],
                                correctAnswer: 0
                            }
                        ]
                    }
                },
                {
                    id: 2,
                    title: 'CSS Styling',
                    description: 'Master CSS for beautiful web pages',
                    resources: [
                        { id: 3, title: 'CSS Flexbox Guide', type: 'pdf', url: '#' },
                        { id: 4, title: 'Responsive Design Techniques', type: 'document', url: '#' }
                    ],
                    videos: [
                        { id: 201, title: 'CSS Selectors Deep Dive', url: 'https://www.youtube.com/embed/l1mER1bV0N0', duration: '14:10' },
                        { id: 202, title: 'Flexbox Layout System', url: 'https://www.youtube.com/embed/JJSoEo8JSnc', duration: '20:15' },
                        { id: 203, title: 'CSS Grid Made Simple', url: 'https://www.youtube.com/embed/jV8B24rSN5o', duration: '16:45' }
                    ],
                    quiz: {
                        id: 102,
                        title: 'CSS Mastery Quiz',
                        questions: [
                            {
                                id: 1,
                                question: 'Which property is used to change the background color?',
                                options: ['color', 'bgcolor', 'background-color', 'background'],
                                correctAnswer: 2
                            },
                            {
                                id: 2,
                                question: 'Which CSS property controls the text size?',
                                options: ['text-size', 'font-size', 'text-style', 'font-style'],
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 2,
            title: 'React JavaScript Framework',
            description: 'Build modern web applications with React',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 45,
            instructor: 'Dr. Michael Chen',
            modules: [
                {
                    id: 1,
                    title: 'React Fundamentals',
                    description: 'Learn the basics of React components',
                    resources: [
                        { id: 5, title: 'React Starter Guide', type: 'pdf', url: '#' },
                        { id: 6, title: 'Component Lifecycle Video', type: 'video', url: '#' }
                    ],
                    videos: [
                        { id: 301, title: 'Introduction to React', url: 'https://www.youtube.com/embed/Ke90Tje7VS0', duration: '22:30' },
                        { id: 302, title: 'React Hooks Explained', url: 'https://www.youtube.com/embed/TNhaISOUy6Q', duration: '17:45' },
                        { id: 303, title: 'State Management in React', url: 'https://www.youtube.com/embed/O6P86uwfdR0', duration: '19:10' }
                    ],
                    quiz: {
                        id: 201,
                        title: 'React Fundamentals Quiz',
                        questions: [
                            {
                                id: 1,
                                question: 'What is JSX?',
                                options: [
                                    'A JavaScript library',
                                    'A syntax extension for JavaScript',
                                    'A programming language',
                                    'A database query language'
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: 2,
                                question: 'Which hook is used for state in functional components?',
                                options: ['useEffect', 'useState', 'useContext', 'useReducer'],
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 3,
            title: 'Data Science with Python',
            description: 'Learn data analysis and visualization',
            image: 'https://images.unsplash.com/photo-1551288049-3b2afe19f372?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 20,
            instructor: 'Prof. Amanda Lewis',
            modules: [
                {
                    id: 1,
                    title: 'Python for Data Analysis',
                    description: 'Use Python libraries for data processing',
                    resources: [
                        { id: 7, title: 'Pandas Tutorial', type: 'pdf', url: '#' },
                        { id: 8, title: 'Data Visualization Best Practices', type: 'document', url: '#' }
                    ],
                    videos: [
                        { id: 401, title: 'Python Data Analysis Overview', url: 'https://www.youtube.com/embed/r-uOLxNrNk8', duration: '15:50' },
                        { id: 402, title: 'Pandas Library Tutorial', url: 'https://www.youtube.com/embed/vmEHCJofslg', duration: '21:15' },
                        { id: 403, title: 'Data Visualization with Matplotlib', url: 'https://www.youtube.com/embed/0P7QnIQDBJY', duration: '18:30' }
                    ],
                    quiz: {
                        id: 301,
                        title: 'Python Data Analysis Quiz',
                        questions: [
                            {
                                id: 1,
                                question: 'Which library is used for data manipulation in Python?',
                                options: ['NumPy', 'Pandas', 'Matplotlib', 'SciPy'],
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 4,
            title: 'Machine Learning Essentials',
            description: 'Introduction to machine learning algorithms',
            image: 'https://images.unsplash.com/photo-1677442135968-8d0f8c24b661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 0,
            instructor: 'Dr. Robert Park',
            recommended: true
        },
        // Add new courses with relevant images
        {
            id: 5,
            title: 'JavaScript Deep Dive',
            description: 'Master advanced JavaScript concepts and patterns',
            image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 0,
            instructor: 'Dr. Emily Rodriguez',
            recommended: true,
            modules: []
        },
        {
            id: 6,
            title: 'Backend Development with Node.js',
            description: 'Build scalable and robust server applications',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 0,
            instructor: 'Prof. James Wilson',
            recommended: false,
            modules: []
        },
        {
            id: 7,
            title: 'Mobile App Development with Flutter',
            description: 'Create beautiful cross-platform mobile applications',
            image: 'https://images.unsplash.com/photo-1596742578443-7682ef7b7a0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 0,
            instructor: 'Dr. Sophie Chen',
            recommended: true,
            modules: []
        },
        {
            id: 8,
            title: 'UI/UX Design Principles',
            description: 'Design intuitive and engaging user experiences',
            image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 0,
            instructor: 'Prof. Maya Johnson',
            recommended: false,
            modules: []
        }
    ];

    // Completed certificates
    const certificatesData = [
        {
            id: 1,
            courseId: 1,
            title: 'Web Development Fundamentals',
            issueDate: '2023-05-15',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        }
    ];

    useEffect(() => {
        // Load user data
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.username) {
                setUsername(user.username);
            } else {
                setUsername('Guest User');
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            setUsername('Guest User');
        }
        
        // Initialize courses and enrolled courses
        setCourses(coursesData);
        setEnrolledCourses([1, 2, 3]); // Mock enrolled course IDs

        // Load completed modules from local storage
        const savedCompletedModules = JSON.parse(localStorage.getItem('completedModules') || '{}');
        setCompletedModules(savedCompletedModules);

        // Set certificates
        setCertificates(certificatesData);

        // Fetch all courses from the API
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8083/courses');
                setCourses(response.data || []);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();

        // Load assignments data
        setAssignments(assignmentsData);
        
        // Load submitted assignments from localStorage
        try {
            const savedSubmissions = JSON.parse(localStorage.getItem('submittedAssignments') || '{}');
            setSubmittedAssignments(savedSubmissions);
        } catch (error) {
            console.error('Error loading submitted assignments:', error);
        }
    }, []);

    // Handle quiz submission
    const handleQuizSubmit = () => {
        if (!currentQuiz) return;

        // Calculate score
        let correctCount = 0;
        currentQuiz.questions.forEach(question => {
            if (userAnswers[question.id] === question.correctAnswer) {
                correctCount++;
            }
        });

        const score = Math.round((correctCount / currentQuiz.questions.length) * 100);
        const passed = score >= 70; // Pass threshold

        // Set quiz result
        setQuizResult({
            score,
            passed,
            total: currentQuiz.questions.length,
            correct: correctCount
        });

        // If passed, mark module as completed
        if (passed && selectedModule && selectedCourse) {
            const moduleKey = `${selectedCourse.id}-${selectedModule.id}`;
            const updatedCompletedModules = {
                ...completedModules,
                [moduleKey]: true
            };
            setCompletedModules(updatedCompletedModules);

            // Save to localStorage
            localStorage.setItem('completedModules', JSON.stringify(updatedCompletedModules));

            // Update course progress
            updateCourseProgress(selectedCourse.id);
        }
    };

    // Update course progress
    const updateCourseProgress = (courseId) => {
        const course = courses.find(c => c.id === courseId);
        if (!course || !course.modules) return;

        // Calculate progress percentage
        const totalModules = course.modules.length;
        let completedCount = 0;
        course.modules.forEach(module => {
            if (completedModules[`${courseId}-${module.id}`]) {
                completedCount++;
            }
        });

        const newProgress = Math.round((completedCount / totalModules) * 100);
        
        // Update courses state
        const updatedCourses = courses.map(c => 
            c.id === courseId ? { ...c, progress: newProgress } : c
        );
        setCourses(updatedCourses);
    };

    // Handle answer selection
    const handleAnswerSelect = (questionId, optionIndex) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: optionIndex
        });
    };

    // Start a quiz
    const startQuiz = (course, module) => {
        setSelectedCourse(course);
        setSelectedModule(module);
        setCurrentQuiz(module.quiz);
        setUserAnswers({});
        setQuizResult(null);
        setActiveSection('quiz');
    };

    // Prepare chart data for progress visualization
    const prepareChartData = () => {
        // For pie chart - showing actual enrollment status
        const pieData = {
            labels: ['Completed', 'In Progress', 'Not Started', 'Not Enrolled'],
            datasets: [
                {
                    data: [
                        courses.filter(c => enrolledCourses.includes(c.id) && c.progress === 100).length,
                        courses.filter(c => enrolledCourses.includes(c.id) && c.progress > 0 && c.progress < 100).length,
                        courses.filter(c => enrolledCourses.includes(c.id) && c.progress === 0).length,
                        courses.filter(c => !enrolledCourses.includes(c.id)).length
                    ],
                    backgroundColor: ['#4CAF50', '#FFC107', '#E0E0E0', '#BBBBBB'],
                    borderWidth: 0
                }
            ]
        };
        
        // For bar chart (enrolled course progress)
        const barData = {
            labels: courses.filter(c => enrolledCourses.includes(c.id)).map(c => c.title),
            datasets: [
                {
                    label: 'Course Progress (%)',
                    data: courses.filter(c => enrolledCourses.includes(c.id)).map(c => c.progress),
                    backgroundColor: '#3f51b5',
                    borderRadius: 5,
                }
            ]
        };
        
        return { pieData, barData };
    };

    // Render dashboard section
    const renderDashboard = () => {
        // Get current date for personalized greeting
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        
        // Calculate learning statistics
        const totalModulesCompleted = Object.keys(completedModules).length;
        const activeCourses = courses.filter(c => enrolledCourses.includes(c.id) && c.progress > 0 && c.progress < 100).length;
        const timeSpentLearning = totalModulesCompleted * 2.5; // Estimate hours based on completed modules
        
        // Identify recommended courses (either marked as recommended or best match based on current courses)
        const recommendedCoursesData = courses
            .filter(c => c.recommended && !enrolledCourses.includes(c.id))
            .slice(0, 2);
        
        return (
            <div className="dashboard-content styled-section">
                <div className="welcome-banner">
                    <div className="welcome-text">
                        <h2>Welcome back, {username}!</h2>
                        <p>{formattedDate}</p>
                        <p className="welcome-message">Continue your learning journey today.</p>
                    </div>
                    <div className="illustration">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/online-learning-3678118-3061146.png" 
                             alt="Learning illustration" />
                    </div>
                </div>
                
                {/* Stats overview */}
                <div style={statsContainerStyle} className="stats-container">
                    <div 
                        style={statCardStyle} 
                        className="stat-card"
                    >
                        <h3>Enrolled Courses</h3>
                        <p style={statValueStyle} className="stat-value">{enrolledCourses.length}</p>
                    </div>
                    <div 
                        style={statCardStyle} 
                        className="stat-card"
                    >
                        <h3>Completed Courses</h3>
                        <p style={statValueStyle} className="stat-value">
                            {courses.filter(c => enrolledCourses.includes(c.id) && c.progress === 100).length}
                        </p>
                    </div>
                    <div 
                        style={statCardStyle} 
                        className="stat-card"
                    >
                        <h3>Certificates Earned</h3>
                        <p style={statValueStyle} className="stat-value">{certificates.length}</p>
                    </div>
                </div>
                
                <div className="dashboard-two-col">
                    {/* Learning Progress Section */}
                    <div className="dashboard-card learning-progress">
                        <h3 className="card-title">Your Learning Progress</h3>
                        <div className="progress-stats">
                            <div className="progress-stat-item">
                                <div className="circular-progress">
                                    <div className="inner-circle">
                                        <span className="progress-value">{totalModulesCompleted}</span>
                                    </div>
                                </div>
                                <p>Modules Completed</p>
                            </div>
                            <div className="progress-stat-item">
                                <div className="circular-progress">
                                    <div className="inner-circle">
                                        <span className="progress-value">{activeCourses}</span>
                                    </div>
                                </div>
                                <p>Active Courses</p>
                            </div>
                            <div className="progress-stat-item">
                                <div className="circular-progress">
                                    <div className="inner-circle">
                                        <span className="progress-value">{timeSpentLearning.toFixed(1)}</span>
                                    </div>
                                </div>
                                <p>Hours Learning</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Recently Accessed */}
                    <div className="dashboard-card recent-activity">
                        <h3 className="card-title">Recent Activity</h3>
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-icon completed">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <div className="timeline-content">
                                    <h4>Completed Quiz</h4>
                                    <p>HTML Fundamentals Quiz</p>
                                    <small>2 days ago</small>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-icon video">
                                    <i className="fas fa-play-circle"></i>
                                </div>
                                <div className="timeline-content">
                                    <h4>Watched Video</h4>
                                    <p>React Hooks Explained</p>
                                    <small>3 days ago</small>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-icon enrolled">
                                    <i className="fas fa-plus-circle"></i>
                                </div>
                                <div className="timeline-content">
                                    <h4>Enrolled in Course</h4>
                                    <p>Data Science with Python</p>
                                    <small>1 week ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Continue Learning Section */}
                <div className="dashboard-card continue-learning">
                    <h3 className="card-title">Continue Learning</h3>
                    <div className="continue-courses">
                        {courses.filter(c => enrolledCourses.includes(c.id) && c.progress > 0 && c.progress < 100)
                            .slice(0, 2)
                            .map(course => (
                                <div key={course.id} className="continue-course-card">
                                    <div className="continue-course-image">
                                        <img src={course.image} alt={course.title} />
                                    </div>
                                    <div className="continue-course-info">
                                        <h4>{course.title}</h4>
                                        <div className="progress-container small">
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{width: `${course.progress}%`}}></div>
                                            </div>
                                            <span className="progress-text">{course.progress}% complete</span>
                                        </div>
                                        <button 
                                            className="continue-button"
                                            onClick={() => {
                                                setSelectedCourse(course);
                                                setActiveSection('course-detail');
                                            }}
                                        >
                                            Continue Learning
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                
                {/* Recommended Courses Section */}
                <div className="dashboard-card recommended-courses">
                    <h3 className="card-title">Recommended For You</h3>
                    <div className="recommended-courses-list">
                        {recommendedCoursesData.map(course => (
                            <div key={course.id} className="recommended-course-card">
                                <div className="recommended-course-image">
                                    <img src={course.image} alt={course.title} />
                                </div>
                                <div className="recommended-course-info">
                                    <h4>{course.title}</h4>
                                    <p>{course.description}</p>
                                    <div className="course-meta-small">
                                        <span><i className="fas fa-user"></i> {course.instructor}</span>
                                    </div>
                                    <button 
                                        className="enroll-button-small"
                                        onClick={() => setActiveSection('all-courses')}
                                    >
                                        View Course
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    .welcome-banner {
                        background: linear-gradient(135deg, #6ac1c5, #bda5ff);
                        border-radius: 15px;
                        padding: 30px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: white;
                        margin-bottom: 30px;
                        box-shadow: 0 10px 20px rgba(106, 193, 197, 0.2);
                    }

                    .welcome-text {
                        flex: 1;
                    }

                    .welcome-text h2 {
                        font-size: 2.2rem;
                        margin-bottom: 10px;
                    }

                    .welcome-message {
                        font-size: 1.2rem;
                        opacity: 0.9;
                        margin-top: 10px;
                    }

                    .illustration {
                        max-width: 200px;
                    }

                    .illustration img {
                        width: 100%;
                        height: auto;
                    }

                    .dashboard-two-col {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 25px;
                        margin-bottom: 25px;
                    }

                    .dashboard-card {
                        background: white;
                        border-radius: 12px;
                        padding: 25px;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                        margin-bottom: 25px;
                    }

                    .card-title {
                        font-size: 1.4rem;
                        color: #333;
                        margin-bottom: 20px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #eee;
                    }

                    /* Progress Stats Styling */
                    .progress-stats {
                        display: flex;
                        justify-content: space-around;
                    }

                    .progress-stat-item {
                        text-align: center;
                    }

                    .circular-progress {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        background: conic-gradient(#6ac1c5 var(--progress, 70%), #f3f3f3 var(--progress, 70%));
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: 0 auto 15px;
                    }

                    .inner-circle {
                        width: 80px;
                        height: 80px;
                        background: white;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .progress-value {
                        font-size: 1.8rem;
                        font-weight: bold;
                        color: #333;
                    }

                    /* Timeline Styling */
                    .timeline {
                        position: relative;
                        padding: 10px 0;
                    }

                    .timeline:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 15px;
                        height: 100%;
                        width: 2px;
                        background: #eee;
                    }

                    .timeline-item {
                        display: flex;
                        margin-bottom: 20px;
                        position: relative;
                    }

                    .timeline-icon {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        margin-right: 15px;
                        z-index: 2;
                    }

                    .timeline-icon.completed {
                        background: #4CAF50;
                    }

                    .timeline-icon.video {
                        background: #2196F3;
                    }

                    .timeline-icon.enrolled {
                        background: #9C27B0;
                    }

                    .timeline-content {
                        flex: 1;
                        padding: 10px 15px;
                        background: #f9f9f9;
                        border-radius: 5px;
                    }

                    .timeline-content h4 {
                        margin: 0 0 5px;
                        color: #333;
                    }

                    .timeline-content p {
                        margin: 0;
                        color: #666;
                    }

                    .timeline-content small {
                        color: #999;
                        font-size: 0.8rem;
                    }

                    /* Continue Learning Section */
                    .continue-courses {
                        display: flex;
                        gap: 20px;
                        overflow-x: auto;
                        padding-bottom: 10px;
                    }

                    .continue-course-card {
                        display: flex;
                        background: #f9f9f9;
                        border-radius: 10px;
                        overflow: hidden;
                        width: 100%;
                        max-width: 550px;
                        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
                    }

                    .continue-course-image {
                        width: 120px;
                        height: 120px;
                    }

                    .continue-course-image img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .continue-course-info {
                        padding: 15px;
                        flex: 1;
                    }

                    .continue-course-info h4 {
                        margin: 0 0 10px;
                        color: #333;
                    }

                    .progress-container.small {
                        margin: 10px 0;
                    }

                    .continue-button {
                        background: linear-gradient(135deg, #6ac1c5, #bda5ff);
                        color: white;
                        border: none;
                        padding: 8px 15px;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-top: 10px;
                        transition: all 0.2s ease;
                    }

                    .continue-button:hover {
                        opacity: 0.9;
                        transform: translateY(-2px);
                    }

                    /* Recommended Courses Section */
                    .recommended-courses-list {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                        gap: 20px;
                    }

                    .recommended-course-card {
                        background: #f9f9f9;
                        border-radius: 10px;
                        overflow: hidden;
                        transition: transform 0.2s ease;
                    }

                    .recommended-course-card:hover {
                        transform: translateY(-5px);
                    }

                    .recommended-course-image {
                        height: 160px;
                    }

                    .recommended-course-image img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .recommended-course-info {
                        padding: 15px;
                    }

                    .recommended-course-info h4 {
                        margin: 0 0 10px;
                        color: #333;
                    }

                    .recommended-course-info p {
                        color: #666;
                        font-size: 0.9rem;
                        margin-bottom: 15px;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }

                    .course-meta-small {
                        color: #777;
                        font-size: 0.8rem;
                        margin-bottom: 15px;
                    }

                    .course-meta-small i {
                        margin-right: 5px;
                        color: #6ac1c5;
                    }

                    .enroll-button-small {
                        background: linear-gradient(135deg, #6ac1c5, #bda5ff);
                        color: white;
                        border: none;
                        padding: 8px 15px;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        display: block;
                        width: 100%;
                    }

                    .enroll-button-small:hover {
                        opacity: 0.9;
                    }

                    @media (max-width: 900px) {
                        .dashboard-two-col {
                            grid-template-columns: 1fr;
                        }
                    }
                `}</style>
            </div>
        );
    };

    // New function to render modules and videos for a selected course
    const renderModulesView = (course) => {
        if (!course || !course.modules) return null;
        
        return (
            <div className="modules-view">
                <div className="back-button-container">
                    <button className="back-button" onClick={() => setViewingModules(null)}>
                        &larr; Back to Dashboard
                    </button>
                </div>
                <div className="course-header">
                    <div className="course-header-image">
                        <img src={course.image} alt={course.title} />
                    </div>
                    <div className="course-header-info">
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                        <p className="instructor">Instructor: {course.instructor}</p>
                    </div>
                </div>
                <div className="course-modules-list">
                    <h3>Course Modules and Videos</h3>
                    {course.modules.map(module => (
                        <div key={module.id} className="module-card expanded">
                            <div className="module-header">
                                <h4>{module.title}</h4>
                                {completedModules[`${course.id}-${module.id}`] && <span className="completed-badge">✓ Completed</span>}
                            </div>
                            <p>{module.description}</p>
                            <div className="module-resources">
                                <h5>Learning Resources</h5>
                                <ul className="resources-list">
                                    {module.resources.map(resource => (
                                        <li key={resource.id} className={`resource-item ${resource.type}`}>
                                            {resource.type === 'pdf' && <i className="fas fa-file-pdf"></i>}
                                            {resource.type === 'video' && <i className="fas fa-video"></i>}
                                            {resource.type === 'document' && <i className="fas fa-file-alt"></i>}
                                            <span>{resource.title}</span>
                                            <button className="resource-button">View</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {module.quiz && (
                                <div className="module-quiz">
                                    <h5>Module Assessment</h5>
                                    <button 
                                        className="take-quiz-button"
                                        onClick={() => startQuiz(course, module)}
                                    >
                                        {completedModules[`${course.id}-${module.id}`] ? 'Retake Quiz' : 'Take Quiz'}
                                    </button>
                                </div>
                            )}
                            <div className="module-videos">
                                <h5>Module Videos</h5>
                                <div className="videos-container">
                                    {module.videos.map(video => (
                                        <div key={video.id} className="video-item">
                                            <div className="video-embed">
                                                <iframe 
                                                    src={video.url} 
                                                    title={video.title} 
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                            <div className="video-info">
                                                <h6>{video.title}</h6>
                                                <p>Duration: {video.duration}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render courses section
    const renderCourses = () => {
        const enrolledCoursesData = courses.filter(course => enrolledCourses.includes(course.id));
        
        return (
            <div className="courses-content">
                <h2 className="section-title">My Courses</h2>
                <div className="courses-grid full-width">
                    {enrolledCoursesData.map(course => (
                        <div key={course.id} className="course-card detailed">
                            <div className="course-image">
                                <img src={course.image} alt={course.title} />
                            </div>
                            <div className="course-info">
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <p className="instructor">Instructor: {course.instructor}</p>
                                <div className="progress-container">
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: `${course.progress}%`}}></div>
                                    </div>
                                    <span className="progress-text">{course.progress}% complete</span>
                                </div>
                                <button 
                                    className="view-course-button"
                                    onClick={() => {
                                        setSelectedCourse(course);
                                        setActiveSection('course-detail');
                                    }}
                                >
                                    View Course
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render all courses section
    const renderAllCourses = () => {
        const handleEnroll = async (course) => {
            const payload = {
                username, // User's username
                courseHead: course.title, // Course title as courseHead
                courseId: course.id, // Course ID
                percentage: 0, // Default percentage for new enrollment
            };

            try {
                const response = await axios.post(`http://localhost:8083/student-course`, payload);
                alert(response.data || 'Enrolled successfully!');
            } catch (error) {
                console.error('Error enrolling in course:', error);
                alert('Failed to enroll in the course. Please try again.');
            }
        };

        return (
            <div className="all-courses-content styled-section">
                <h2 className="section-title styled-title">All Courses</h2>
                <div className="courses-card-grid">
                    {courses.length > 0 ? (
                        courses.map(course => (
                            <div key={course.id} className="modern-course-card">
                                <div className="card-image-container">
                                    <img src={course.image} alt={course.title} className="course-card-image" />
                                    <div className="course-difficulty">
                                        {course.progress > 60 ? "Advanced" : course.progress > 30 ? "Intermediate" : "Beginner"}
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h3 className="course-title">{course.title}</h3>
                                    <p className="course-description">{course.description}</p>
                                    <div className="course-meta">
                                        <span className="course-instructor">
                                            <i className="fas fa-user-tie"></i> {course.instructor || 'Instructor'}
                                        </span>
                                        <span className="course-modules">
                                            <i className="fas fa-book"></i> {course.modules?.length || 0} Modules
                                        </span>
                                    </div>
                                    <button 
                                        className="modern-enroll-button"
                                        onClick={() => handleEnroll(course)}
                                    >
                                        <i className="fas fa-plus-circle"></i> Enroll Now
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-courses-message styled-message">No courses available at the moment.</p>
                    )}
                </div>

                <style jsx>{`
                    .courses-card-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                        gap: 25px;
                        margin-top: 30px;
                    }
                    
                    .modern-course-card {
                        background: white;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                    }
                    
                    .modern-course-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                    }
                    
                    .card-image-container {
                        position: relative;
                        height: 180px;
                        overflow: hidden;
                    }
                    
                    .course-card-image {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: transform 0.5s ease;
                    }
                    
                    .modern-course-card:hover .course-card-image {
                        transform: scale(1.05);
                    }
                    
                    .course-difficulty {
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        background: rgba(0, 0, 0, 0.7);
                        color: white;
                        padding: 5px 12px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 500;
                    }
                    
                    .card-content {
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        flex-grow: 1;
                    }
                    
                    .course-title {
                        font-size: 18px;
                        margin: 0 0 12px 0;
                        color: #2c3e50;
                    }
                    
                    .course-description {
                        color: #666;
                        margin: 0 0 15px 0;
                        font-size: 14px;
                        line-height: 1.5;
                        flex-grow: 1;
                    }
                    
                    .course-meta {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        color: #666;
                        font-size: 13px;
                    }
                    
                    .course-instructor i, .course-modules i {
                        margin-right: 5px;
                        color: #6ac1c5;
                    }
                    
                    .modern-enroll-button {
                        background: linear-gradient(135deg, #6ac1c5, #bda5ff);
                        color: white;
                        border: none;
                        padding: 12px;
                        border-radius: 6px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    
                    .modern-enroll-button i {
                        margin-right: 8px;
                    }
                    
                    .modern-enroll-button:hover {
                        opacity: 0.9;
                        transform: translateY(-2px);
                    }
                `}</style>
            </div>
        );
    };

    // Render course detail with resources and modules
    const renderCourseDetail = () => {
        if (!selectedCourse) return null;
        
        return (
            <div className="course-detail">
                <div className="back-button-container">
                    <button className="back-button" onClick={() => setActiveSection('courses')}>
                        &larr; Back to Courses
                    </button>
                </div>
                <div className="course-header">
                    <div className="course-header-image">
                        <img src={selectedCourse.image} alt={selectedCourse.title} />
                    </div>
                    <div className="course-header-info">
                        <h2>{selectedCourse.title}</h2>
                        <p>{selectedCourse.description}</p>
                        <p className="instructor">Instructor: {selectedCourse.instructor}</p>
                    </div>
                </div>
                <div className="progress-container large">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{width: `${selectedCourse.progress}%`}}></div>
                    </div>
                    <span className="progress-text">{selectedCourse.progress}% complete</span>
                </div>
                <div className="course-modules">
                    <h3>Course Modules</h3>
                    {selectedCourse.modules.map(module => {
                        const isCompleted = completedModules[`${selectedCourse.id}-${module.id}`];
                        return (
                            <div key={module.id} className={`module-card ${isCompleted ? 'completed' : ''}`}>
                                <div className="module-header">
                                    <h4>{module.title}</h4>
                                    {isCompleted && <span className="completed-badge">✓ Completed</span>}
                                </div>
                                <p>{module.description}</p>
                                <div className="module-resources">
                                    <h5>Learning Resources</h5>
                                    <ul className="resources-list">
                                        {module.resources.map(resource => (
                                            <li key={resource.id} className={`resource-item ${resource.type}`}>
                                                {resource.type === 'pdf' && <i className="fas fa-file-pdf"></i>}
                                                {resource.type === 'video' && <i className="fas fa-video"></i>}
                                                {resource.type === 'document' && <i className="fas fa-file-alt"></i>}
                                                <span>{resource.title}</span>
                                                <button className="resource-button">View</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {module.quiz && (
                                    <div className="module-quiz">
                                        <h5>Module Assessment</h5>
                                        <button 
                                            className="take-quiz-button"
                                            onClick={() => startQuiz(selectedCourse, module)}
                                        >
                                            {isCompleted ? 'Retake Quiz' : 'Take Quiz'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Render quiz section
    const renderQuiz = () => {
        if (!currentQuiz) return null;
        
        return (
            <div className="quiz-container">
                <div className="back-button-container">
                    <button className="back-button" onClick={() => setActiveSection('course-detail')}>
                        &larr; Back to Course
                    </button>
                </div>
                <h2>{currentQuiz.title}</h2>
                {!quizResult ? (
                    <>
                        <div className="quiz-questions">
                            {currentQuiz.questions.map((question, index) => (
                                <div key={question.id} className="quiz-question">
                                    <h4>Question {index + 1}: {question.question}</h4>
                                    <div className="quiz-options">
                                        {question.options.map((option, idx) => (
                                            <label key={idx} className="quiz-option">
                                                <input 
                                                    type="radio" 
                                                    name={`question-${question.id}`}
                                                    checked={userAnswers[question.id] === idx}
                                                    onChange={() => handleAnswerSelect(question.id, idx)}
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button 
                            className="submit-quiz-button"
                            onClick={handleQuizSubmit}
                            disabled={currentQuiz.questions.length !== Object.keys(userAnswers).length}
                        >
                            Submit Quiz
                        </button>
                    </>
                ) : (
                    <div className={`quiz-result ${quizResult.passed ? 'passed' : 'failed'}`}>
                        <h3>Quiz Results</h3>
                        <div className="score-display">
                            <div className="score-circle">
                                <span>{quizResult.score}%</span>
                            </div>
                            <p>You answered {quizResult.correct} out of {quizResult.total} questions correctly.</p>
                        </div>
                        {quizResult.passed ? (
                            <div className="success-message">
                                <h4>Congratulations! You passed the quiz.</h4>
                                <p>You've successfully completed this module.</p>
                            </div>
                        ) : (
                            <div className="failure-message">
                                <h4>You didn't pass this time.</h4>
                                <p>Review the module content and try again.</p>
                            </div>
                        )}
                        <div className="result-actions">
                            <button 
                                className="retry-button"
                                onClick={() => {
                                    setUserAnswers({});
                                    setQuizResult(null);
                                }}
                            >
                                Try Again
                            </button>
                            <button 
                                className="return-button"
                                onClick={() => setActiveSection('course-detail')}
                            >
                                Return to Course
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Render certificates section
    const renderCertificates = () => {
        return (
            <div className="certificates-content">
                <h2 className="section-title">My Certificates</h2>
                {certificates.length === 0 ? (
                    <div className="no-certificates">
                        <p>You haven't earned any certificates yet. Complete a course to earn your first certificate!</p>
                    </div>
                ) : (
                    <div className="certificates-grid">
                        {certificates.map(certificate => (
                            <div key={certificate.id} className="certificate-card">
                                <div className="certificate-image">
                                    <img src={certificate.image} alt={certificate.title} />
                                    <div className="certificate-overlay">
                                        <i className="fas fa-certificate"></i>
                                    </div>
                                </div>
                                <div className="certificate-info">
                                    <h3>{certificate.title}</h3>
                                    <p>Issued on: {new Date(certificate.issueDate).toLocaleDateString()}</p>
                                    <div className="certificate-actions">
                                        <button className="view-certificate">View</button>
                                        <button className="download-certificate">
                                            <i className="fas fa-download"></i> Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Assignment data including quizzes
    const assignmentsData = [
        {
            id: 1,
            title: "Java OOPs Concepts Quiz",
            description: "Test your knowledge of Object-Oriented Programming concepts in Java",
            dueDate: "2023-12-15",
            points: 100,
            timeLimit: 20, // minutes
            type: "quiz",
            category: "Java",
            questions: [
                {
                    id: 1,
                    question: "Which of the following is NOT a pillar of OOP?",
                    options: [
                        "Encapsulation", 
                        "Inheritance", 
                        "Compilation", 
                        "Polymorphism"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 2,
                    question: "What is the purpose of the 'final' keyword in Java?",
                    options: [
                        "To make a variable constant", 
                        "To prevent method overriding", 
                        "To prevent inheritance", 
                        "All of the above"
                    ],
                    correctAnswer: 3
                },
                {
                    id: 3,
                    question: "Which concept allows a class to have multiple methods with the same name but different parameters?",
                    options: [
                        "Method Overriding", 
                        "Method Overloading", 
                        "Inheritance", 
                        "Abstraction"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 4,
                    question: "What is the output of the following code?\nclass Parent { void show() { System.out.println(\"Parent\"); } }\nclass Child extends Parent { void show() { System.out.println(\"Child\"); } }\nclass Main { public static void main(String[] args) { Parent obj = new Child(); obj.show(); } }",
                    options: [
                        "Parent", 
                        "Child", 
                        "Compilation Error", 
                        "Runtime Error"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 5,
                    question: "Which access modifier is most restrictive in Java?",
                    options: [
                        "public", 
                        "protected", 
                        "default (no modifier)", 
                        "private"
                    ],
                    correctAnswer: 3
                }
            ]
        },
        {
            id: 2,
            title: "HTML & Full Stack Concepts",
            description: "Test your knowledge of HTML and full stack development",
            dueDate: "2023-12-20",
            points: 100,
            timeLimit: 15, // minutes
            type: "quiz",
            category: "Web Development",
            questions: [
                {
                    id: 1,
                    question: "What does HTML stand for?",
                    options: [
                        "Hyper Text Markup Language", 
                        "High Tech Modern Language", 
                        "Hyper Transfer Markup Language", 
                        "Hyperlink Text Management Language"
                    ],
                    correctAnswer: 0
                },
                {
                    id: 2,
                    question: "Which of the following is NOT a frontend technology?",
                    options: [
                        "HTML", 
                        "CSS", 
                        "Express.js", 
                        "React.js"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 3,
                    question: "What is the purpose of a RESTful API in a full stack application?",
                    options: [
                        "To style web pages", 
                        "To create database schemas", 
                        "To facilitate communication between frontend and backend", 
                        "To optimize images for web"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 4,
                    question: "Which HTML tag is used to create a dropdown list?",
                    options: [
                        "<dropdown>", 
                        "<select>", 
                        "<option>", 
                        "<list>"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 5,
                    question: "Which of the following is a client-side storage option?",
                    options: [
                        "MongoDB", 
                        "MySQL", 
                        "localStorage", 
                        "PostgreSQL"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: 3,
            title: "Spring Boot Fundamentals",
            description: "Test your knowledge of Spring Boot framework and concepts",
            dueDate: "2023-12-25",
            points: 150,
            timeLimit: 30, // minutes
            type: "quiz",
            category: "Backend Development",
            questions: [
                {
                    id: 1,
                    question: "What is Spring Boot?",
                    options: [
                        "A JavaScript library", 
                        "An operating system", 
                        "A Java framework that simplifies Spring application development", 
                        "A database management system"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 2,
                    question: "Which annotation is used to define a RESTful controller in Spring Boot?",
                    options: [
                        "@Controller", 
                        "@RestController", 
                        "@APIController", 
                        "@RequestController"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 3,
                    question: "What is the purpose of the @Autowired annotation in Spring Boot?",
                    options: [
                        "For automatic dependency injection", 
                        "To create new objects", 
                        "To map HTTP requests", 
                        "To handle exceptions"
                    ],
                    correctAnswer: 0
                },
                {
                    id: 4,
                    question: "Which Spring Boot property file is loaded by default?",
                    options: [
                        "config.properties", 
                        "application.properties", 
                        "spring.properties", 
                        "boot.properties"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 5,
                    question: "Which of the following is NOT a feature of Spring Boot?",
                    options: [
                        "Auto-configuration", 
                        "Standalone applications", 
                        "Embedded servers", 
                        "Manual XML configuration"
                    ],
                    correctAnswer: 3
                },
                {
                    id: 6,
                    question: "What does JPA stand for in Spring Data JPA?",
                    options: [
                        "Java Processing API", 
                        "Java Persistence API", 
                        "Java Programming Assignment", 
                        "Java Platform Architecture"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 7,
                    question: "Which annotation is used to map a class to a database table in Spring Boot with JPA?",
                    options: [
                        "@Table", 
                        "@Entity", 
                        "@Repository", 
                        "@Database"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: 4,
            title: "JavaScript Advanced Concepts",
            description: "Test your knowledge of advanced JavaScript programming concepts",
            dueDate: "2023-12-28",
            points: 120,
            timeLimit: 25, // minutes
            type: "quiz",
            category: "Frontend Development",
            questions: [
                {
                    id: 1,
                    question: "What is a closure in JavaScript?",
                    options: [
                        "A way to secure JavaScript code", 
                        "A function that has access to variables from its outer scope", 
                        "A method to close browser windows", 
                        "A type of loop"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 2,
                    question: "Which of the following is NOT a JavaScript data type?",
                    options: [
                        "Symbol", 
                        "BigInt", 
                        "Character", 
                        "Undefined"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 3,
                    question: "What does the 'this' keyword refer to in JavaScript?",
                    options: [
                        "It always refers to the global object", 
                        "It refers to the object it belongs to", 
                        "It refers to the parent function", 
                        "It refers to the HTML document"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 4,
                    question: "Which of the following is a promise state?",
                    options: [
                        "Active", 
                        "Running", 
                        "Pending", 
                        "Processed"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 5,
                    question: "What does event bubbling mean in JavaScript?",
                    options: [
                        "Creating multiple events simultaneously", 
                        "When an event triggers on an element and then triggers on its ancestors", 
                        "Preventing events from propagating", 
                        "Handling events in a specific order"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: 5,
            title: "Python Programming Fundamentals",
            description: "Test your knowledge of Python programming concepts and syntax",
            dueDate: "2024-01-05",
            points: 100,
            timeLimit: 20, // minutes
            type: "quiz",
            category: "Python",
            questions: [
                {
                    id: 1,
                    question: "What is the output of the following code?\nprint(type([]))",
                    options: [
                        "<class 'list'>", 
                        "<class 'array'>", 
                        "<class 'dict'>", 
                        "<class 'tuple'>"
                    ],
                    correctAnswer: 0
                },
                {
                    id: 2,
                    question: "Which of the following is not a built-in data type in Python?",
                    options: [
                        "list", 
                        "dictionary", 
                        "array", 
                        "tuple"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 3,
                    question: "What does the 'self' parameter in a Python class method represent?",
                    options: [
                        "The class itself", 
                        "The instance of the class", 
                        "The parent class", 
                        "The module containing the class"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 4,
                    question: "Which of the following is used to define a function in Python?",
                    options: [
                        "function", 
                        "define", 
                        "def", 
                        "func"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 5,
                    question: "What is the output of the following code?\nprint(2 ** 3)",
                    options: [
                        "6", 
                        "8", 
                        "5", 
                        "9"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: 6,
            title: "Database Systems Concepts",
            description: "Test your knowledge of database design, SQL and database management",
            dueDate: "2024-01-10",
            points: 110,
            timeLimit: 25, // minutes
            type: "quiz",
            category: "Database",
            questions: [
                {
                    id: 1,
                    question: "Which of the following is a NoSQL database?",
                    options: [
                        "MySQL", 
                        "PostgreSQL", 
                        "MongoDB", 
                        "Oracle"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 2,
                    question: "What does ACID stand for in database transactions?",
                    options: [
                        "Atomicity, Consistency, Isolation, Durability", 
                        "Atomicity, Completion, Isolation, Durability", 
                        "Aggregation, Consistency, Isolation, Detection", 
                        "Atomicity, Consistency, Integrity, Durability"
                    ],
                    correctAnswer: 0
                },
                {
                    id: 3,
                    question: "Which SQL statement is used to extract data from a database?",
                    options: [
                        "EXTRACT", 
                        "GET", 
                        "SELECT", 
                        "OPEN"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 4,
                    question: "Which normal form eliminates transitive dependencies?",
                    options: [
                        "First Normal Form (1NF)", 
                        "Second Normal Form (2NF)", 
                        "Third Normal Form (3NF)", 
                        "Boyce-Codd Normal Form (BCNF)"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 5,
                    question: "What is a foreign key?",
                    options: [
                        "A key that can access any database", 
                        "A field that uniquely identifies each record in a table", 
                        "A field that links to the primary key of another table", 
                        "An encryption key for securing database connections"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: 7,
            title: "Cloud Computing Fundamentals",
            description: "Test your knowledge of cloud services, deployment models, and best practices",
            dueDate: "2024-01-15",
            points: 130,
            timeLimit: 30, // minutes
            type: "quiz",
            category: "DevOps",
            questions: [
                {
                    id: 1,
                    question: "Which of the following is NOT a cloud service model?",
                    options: [
                        "Infrastructure as a Service (IaaS)", 
                        "Platform as a Service (PaaS)", 
                        "Software as a Service (SaaS)", 
                        "Deployment as a Service (DaaS)"
                    ],
                    correctAnswer: 3
                },
                {
                    id: 2,
                    question: "What is the main advantage of containerization in cloud computing?",
                    options: [
                        "Better application security", 
                        "Lower cost of infrastructure", 
                        "Consistent application deployment across different environments", 
                        "Faster network speed"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 3,
                    question: "Which of the following is an AWS compute service?",
                    options: [
                        "Azure VM", 
                        "EC2", 
                        "Cloud Storage", 
                        "Cloud SQL"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 4,
                    question: "What does serverless computing mean?",
                    options: [
                        "Running applications without any servers", 
                        "The cloud provider manages server allocation and provisioning", 
                        "Using peer-to-peer networking instead of servers", 
                        "Deploying applications directly to client devices"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 5,
                    question: "What is auto-scaling in cloud computing?",
                    options: [
                        "Automatic updating of cloud software", 
                        "Dynamic adjustment of resources based on demand", 
                        "Resizing cloud storage automatically", 
                        "Automated user interface scaling for different devices"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: 8,
            title: "Mobile App Development Concepts",
            description: "Test your knowledge of mobile app development frameworks, principles and practices",
            dueDate: "2024-01-20",
            points: 120,
            timeLimit: 25, // minutes
            type: "quiz",
            category: "Mobile Development",
            questions: [
                {
                    id: 1,
                    question: "Which of these is NOT a mobile app development approach?",
                    options: [
                        "Native", 
                        "Cross-platform", 
                        "Hybrid", 
                        "Systematic"
                    ],
                    correctAnswer: 3
                },
                {
                    id: 2,
                    question: "Which framework uses a single codebase for both iOS and Android?",
                    options: [
                        "Objective-C", 
                        "Swift", 
                        "Java", 
                        "Flutter"
                    ],
                    correctAnswer: 3
                },
                {
                    id: 3,
                    question: "What is the primary programming language for native Android development?",
                    options: [
                        "Swift", 
                        "Kotlin/Java", 
                        "Objective-C", 
                        "C#"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 4,
                    question: "What does PWA stand for in mobile development?",
                    options: [
                        "Progressive Web App", 
                        "Personal Web Application", 
                        "Programmable Web App", 
                        "Platform Wide Application"
                    ],
                    correctAnswer: 0
                },
                {
                    id: 5,
                    question: "Which tool would you use to test how your app behaves with different network conditions?",
                    options: [
                        "JUnit", 
                        "Selenium", 
                        "Network Link Conditioner", 
                        "Git"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: 9,
            title: "Cybersecurity Fundamentals",
            description: "Test your knowledge of cybersecurity concepts, threats and protective measures",
            dueDate: "2024-01-25",
            points: 150,
            timeLimit: 35, // minutes
            type: "quiz",
            category: "Security",
            questions: [
                {
                    id: 1,
                    question: "What is a 'man-in-the-middle' attack?",
                    options: [
                        "A physical security breach", 
                        "Intercepting communication between two systems", 
                        "Denial of service attack", 
                        "Password cracking"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 2,
                    question: "Which of the following is NOT a common authentication factor?",
                    options: [
                        "Something you know", 
                        "Something you have", 
                        "Something you are", 
                        "Something you believe"
                    ],
                    correctAnswer: 3
                },
                {
                    id: 3,
                    question: "What is the primary purpose of encryption?",
                    options: [
                        "To compress data", 
                        "To speed up data processing", 
                        "To protect data confidentiality", 
                        "To format data for transmission"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 4,
                    question: "What does the 'https' in a web URL indicate?",
                    options: [
                        "High-speed transfer protocol", 
                        "The site has a secure connection", 
                        "Home transfer protocol system", 
                        "Hypertext transfer protocol system"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 5,
                    question: "Which of the following is an example of a strong password?",
                    options: [
                        "password123", 
                        "Password", 
                        "P@ssw0rd!", 
                        "john1980"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 6,
                    question: "What is a firewall designed to do?",
                    options: [
                        "Scan for viruses", 
                        "Monitor and control incoming and outgoing network traffic", 
                        "Encrypt data", 
                        "Create secure backup copies of data"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: 10,
            title: "Data Structures and Algorithms",
            description: "Test your knowledge of fundamental data structures and algorithms",
            dueDate: "2024-02-01",
            points: 140,
            timeLimit: 30, // minutes
            type: "quiz",
            category: "Computer Science",
            questions: [
                {
                    id: 1,
                    question: "What is the time complexity of binary search?",
                    options: [
                        "O(n)", 
                        "O(log n)", 
                        "O(n²)", 
                        "O(n log n)"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 2,
                    question: "Which data structure follows the Last In, First Out (LIFO) principle?",
                    options: [
                        "Queue", 
                        "Stack", 
                        "Linked List", 
                        "Tree"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 3,
                    question: "Which sorting algorithm has the best average time complexity?",
                    options: [
                        "Bubble Sort - O(n²)", 
                        "Selection Sort - O(n²)", 
                        "Quick Sort - O(n log n)", 
                        "Insertion Sort - O(n²)"
                    ],
                    correctAnswer: 2
                },
                {
                    id: 4,
                    question: "What is a hash table collision?",
                    options: [
                        "When a hash function generates the same index for different keys", 
                        "When a hash table becomes full", 
                        "When the hash function fails", 
                        "When two hash tables merge"
                    ],
                    correctAnswer: 0
                },
                {
                    id: 5,
                    question: "Which of these is NOT a graph traversal algorithm?",
                    options: [
                        "Depth-First Search (DFS)", 
                        "Breadth-First Search (BFS)", 
                        "Quick-First Search (QFS)", 
                        "Dijkstra's Algorithm"
                    ],
                    correctAnswer: 2
                }
            ]
        }
    ];

    // Handle assignment answer selection
    const handleAssignmentAnswerSelect = (questionId, optionIndex) => {
        setAssignmentAnswers({
            ...assignmentAnswers,
            [questionId]: optionIndex
        });
    };
    
    // Submit assignment
    const handleAssignmentSubmit = () => {
        if (!selectedAssignment) return;
        
        // Calculate score
        let correctCount = 0;
        selectedAssignment.questions.forEach(question => {
            if (assignmentAnswers[question.id] === question.correctAnswer) {
                correctCount++;
            }
        });
        
        const score = Math.round((correctCount / selectedAssignment.questions.length) * 100);
        const passed = score >= 70; // Pass threshold
        
        const result = {
            assignmentId: selectedAssignment.id,
            score,
            passed,
            total: selectedAssignment.questions.length,
            correct: correctCount,
            submittedOn: new Date().toISOString(),
            answers: { ...assignmentAnswers }
        };
        
        // Save to state and localStorage
        const updatedSubmissions = {
            ...submittedAssignments,
            [selectedAssignment.id]: result
        };
        
        setSubmittedAssignments(updatedSubmissions);
        localStorage.setItem('submittedAssignments', JSON.stringify(updatedSubmissions));
        
        // Update result state
        setAssignmentResult(result);
    };
    
    // Start assignment
    const startAssignment = (assignment) => {
        setSelectedAssignment(assignment);
        setAssignmentAnswers({});
        setAssignmentResult(null);
        setActiveSection('assignment-detail');
    };

    // Render assignments section
    const renderAssignments = () => {
        const pendingAssignments = assignments.filter(a => !submittedAssignments[a.id]);
        const completedAssignments = assignments.filter(a => submittedAssignments[a.id]);
        
        return (
            <div className="assignments-content styled-section">
                <h2 className="section-title styled-title">My Assignments</h2>
                
                {pendingAssignments.length > 0 && (
                    <div className="assignments-section">
                        <h3 className="subsection-title">Pending Assignments</h3>
                        <div className="assignments-grid">
                            {pendingAssignments.map(assignment => (
                                <div key={assignment.id} className="assignment-card">
                                    <div className="assignment-header" 
                                        style={{backgroundColor: getCategoryColor(assignment.category)}}>
                                        <span className="assignment-type">{assignment.type.toUpperCase()}</span>
                                        <span className="assignment-points">{assignment.points} pts</span>
                                    </div>
                                    <div className="assignment-body">
                                        <h4>{assignment.title}</h4>
                                        <p className="assignment-description">{assignment.description}</p>
                                        <div className="assignment-meta">
                                            <span><i className="fas fa-calendar"></i> Due: {formatDate(assignment.dueDate)}</span>
                                            <span><i className="fas fa-clock"></i> {assignment.timeLimit} min</span>
                                        </div>
                                        <button 
                                            className="start-assignment-button"
                                            onClick={() => startAssignment(assignment)}
                                        >
                                            Start Assignment
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {completedAssignments.length > 0 && (
                    <div className="assignments-section">
                        <h3 className="subsection-title">Completed Assignments</h3>
                        <div className="assignments-grid">
                            {completedAssignments.map(assignment => {
                                const result = submittedAssignments[assignment.id];
                                return (
                                    <div key={assignment.id} className="assignment-card completed">
                                        <div className="assignment-header"
                                            style={{backgroundColor: getCategoryColor(assignment.category)}}>
                                            <span className="assignment-type">{assignment.type.toUpperCase()}</span>
                                            <span className="assignment-score">{result.score}%</span>
                                        </div>
                                        <div className="assignment-body">
                                            <h4>{assignment.title}</h4>
                                            <p className="assignment-description">{assignment.description}</p>
                                            <div className="assignment-meta">
                                                <span><i className="fas fa-check-circle"></i> Completed: {formatDate(result.submittedOn)}</span>
                                                <span className={`score ${result.passed ? 'passing' : 'failing'}`}>
                                                    {result.passed ? 'Passed' : 'Failed'}
                                                </span>
                                            </div>
                                            <button 
                                                className="review-assignment-button"
                                                onClick={() => {
                                                    setSelectedAssignment(assignment);
                                                    setAssignmentResult(result);
                                                    setAssignmentAnswers(result.answers);
                                                    setActiveSection('assignment-detail');
                                                }}
                                            >
                                                Review Assignment
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                
                {assignments.length === 0 && (
                    <div className="no-assignments">
                        <p>No assignments available at the moment.</p>
                    </div>
                )}

                <style jsx>{`
                    .assignments-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                        gap: 20px;
                        margin-bottom: 30px;
                    }
                    
                    .subsection-title {
                        font-size: 1.3rem;
                        margin: 15px 0;
                        color: #333;
                        border-bottom: 2px solid #eee;
                        padding-bottom: 10px;
                    }
                    
                    .assignment-card {
                        background: white;
                        border-radius: 10px;
                        overflow: hidden;
                        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
                        transition: transform 0.2s ease;
                    }
                    
                    .assignment-card:hover {
                        transform: translateY(-3px);
                    }
                    
                    .assignment-header {
                        padding: 10px 15px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: white;
                        font-weight: 500;
                    }
                    
                    .assignment-body {
                        padding: 15px;
                    }
                    
                    .assignment-body h4 {
                        margin: 0 0 10px;
                        color: #333;
                    }
                    
                    .assignment-description {
                        color: #666;
                        font-size: 0.9rem;
                        margin-bottom: 15px;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    
                    .assignment-meta {
                        display: flex;
                        justify-content: space-between;
                        color: #777;
                        font-size: 0.8rem;
                        margin-bottom: 15px;
                    }
                    
                    .assignment-meta i {
                        margin-right: 5px;
                    }
                    
                    .start-assignment-button, .review-assignment-button {
                        background: linear-gradient(135deg, #6ac1c5, #bda5ff);
                        color: white;
                        border: none;
                        padding: 8px 15px;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        display: block;
                        width: 100%;
                    }
                    
                    .start-assignment-button:hover, .review-assignment-button:hover {
                        opacity: 0.9;
                    }
                    
                    .score {
                        font-weight: bold;
                    }
                    
                    .score.passing {
                        color: #4caf50;
                    }
                    
                    .score.failing {
                        color: #f44336;
                    }
                    
                    .completed .assignment-header {
                        background-color: #4caf50;
                    }
                    
                    .no-assignments {
                        text-align: center;
                        padding: 40px;
                        color: #666;
                        background: #f9f9f9;
                        border-radius: 10px;
                    }
                `}</style>
            </div>
        );
    };
    
    // Render assignment detail/quiz view
    const renderAssignmentDetail = () => {
        if (!selectedAssignment) return null;
        
        return (
            <div className="assignment-detail-container">
                <div className="back-button-container">
                    <button className="back-button" onClick={() => setActiveSection('assignments')}>
                        &larr; Back to Assignments
                    </button>
                </div>
                
                <div className="assignment-detail-header">
                    <h2>{selectedAssignment.title}</h2>
                    <div className="assignment-meta-info">
                        <span><i className="fas fa-graduation-cap"></i> {selectedAssignment.category}</span>
                        <span><i className="fas fa-clock"></i> {selectedAssignment.timeLimit} minutes</span>
                        <span><i className="fas fa-star"></i> {selectedAssignment.points} points</span>
                    </div>
                    <p className="assignment-description">{selectedAssignment.description}</p>
                </div>
                
                {!assignmentResult ? (
                    <div className="assignment-questions-container">
                        <div className="quiz-instructions">
                            <p>Please answer all questions and submit when finished.</p>
                        </div>
                        
                        {selectedAssignment.questions.map((question, index) => (
                            <div key={question.id} className="assignment-question">
                                <h4>Question {index + 1}: {question.question}</h4>
                                <div className="question-options">
                                    {question.options.map((option, idx) => (
                                        <label key={idx} className="question-option">
                                            <input 
                                                type="radio" 
                                                name={`question-${question.id}`}
                                                checked={assignmentAnswers[question.id] === idx}
                                                onChange={() => handleAssignmentAnswerSelect(question.id, idx)}
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        
                        <div className="assignment-actions">
                            <button 
                                className="submit-assignment-button"
                                onClick={handleAssignmentSubmit}
                                disabled={selectedAssignment.questions.length !== Object.keys(assignmentAnswers).length}
                            >
                                Submit Assignment
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="assignment-result-container">
                        <div className={`result-summary ${assignmentResult.passed ? 'passed' : 'failed'}`}>
                            <h3>Assignment Results</h3>
                            <div className="result-score">
                                <div className="score-circle">
                                    <span>{assignmentResult.score}%</span>
                                </div>
                                <p>You answered {assignmentResult.correct} out of {assignmentResult.total} questions correctly.</p>
                            </div>
                            {assignmentResult.passed ? (
                                <div className="success-message">
                                    <h4>Great job! You passed the assignment.</h4>
                                </div>
                            ) : (
                                <div className="failure-message">
                                    <h4>You didn't pass this assignment.</h4>
                                    <p>Review the content and try again later.</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="question-review">
                            <h3>Question Review</h3>
                            {selectedAssignment.questions.map((question, index) => {
                                const userAnswer = assignmentAnswers[question.id];
                                const isCorrect = userAnswer === question.correctAnswer;
                                
                                return (
                                    <div key={question.id} className={`reviewed-question ${isCorrect ? 'correct' : 'incorrect'}`}>
                                        <h4>Question {index + 1}: {question.question}</h4>
                                        <div className="reviewed-options">
                                            {question.options.map((option, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className={`reviewed-option 
                                                        ${idx === userAnswer ? 'user-selected' : ''} 
                                                        ${idx === question.correctAnswer ? 'correct-answer' : ''}`}
                                                >
                                                    <span className="option-text">{option}</span>
                                                    {idx === userAnswer && idx === question.correctAnswer && (
                                                        <span className="answer-icon correct"><i className="fas fa-check-circle"></i></span>
                                                    )}
                                                    {idx === userAnswer && idx !== question.correctAnswer && (
                                                        <span className="answer-icon wrong"><i className="fas fa-times-circle"></i></span>
                                                    )}
                                                    {idx !== userAnswer && idx === question.correctAnswer && (
                                                        <span className="answer-icon correct"><i className="fas fa-check-circle"></i></span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <div className="assignment-actions">
                            <button 
                                className="return-button"
                                onClick={() => setActiveSection('assignments')}
                            >
                                Return to Assignments
                            </button>
                        </div>
                    </div>
                )}
                
                <style jsx>{`
                    .assignment-detail-container {
                        background: white;
                        border-radius: 12px;
                        padding: 25px;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    }
                    
                    .assignment-detail-header {
                        margin-bottom: 25px;
                        padding-bottom: 15px;
                        border-bottom: 1px solid #eee;
                    }
                    
                    .assignment-detail-header h2 {
                        margin-bottom: 10px;
                        color: #333;
                    }
                    
                    .assignment-meta-info {
                        display: flex;
                        gap: 20px;
                        color: #666;
                        font-size: 0.9rem;
                        margin-bottom: 15px;
                    }
                    
                    .assignment-meta-info i {
                        margin-right: 5px;
                        color: #6ac1c5;
                    }
                    
                    .assignment-description {
                        color: #555;
                        font-size: 1rem;
                    }
                    
                    .quiz-instructions {
                        background: #f8f9fa;
                        padding: 15px;
                        border-left: 4px solid #6ac1c5;
                        margin-bottom: 20px;
                        border-radius: 4px;
                    }
                    
                    .assignment-question {
                        background: #f9f9f9;
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                    }
                    
                    .assignment-question h4 {
                        margin-top: 0;
                        color: #333;
                    }
                    
                    .question-options {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        margin-top: 15px;
                    }
                    
                    .question-option {
                        display: flex;
                        align-items: center;
                        padding: 10px;
                        background: white;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background-color 0.2s;
                    }
                    
                    .question-option:hover {
                        background: #f0f0f0;
                    }
                    
                    .question-option input {
                        margin-right: 10px;
                    }
                    
                    .assignment-actions {
                        display: flex;
                        justify-content: flex-end;
                        margin-top: 30px;
                    }
                    
                    .submit-assignment-button,
                    .return-button {
                        background: linear-gradient(135deg, #6ac1c5, #bda5ff);
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }
                    
                    .submit-assignment-button:hover,
                    .return-button:hover {
                        opacity: 0.9;
                        transform: translateY(-2px);
                    }
                    
                    .submit-assignment-button:disabled {
                        background: #cccccc;
                        cursor: not-allowed;
                        transform: none;
                    }
                    
                    /* Result styles */
                    .result-summary {
                        background: #f9f9f9;
                        padding: 25px;
                        border-radius: 8px;
                        margin-bottom: 30px;
                        text-align: center;
                    }
                    
                    .result-summary.passed {
                        background-color: rgba(76, 175, 80, 0.1);
                    }
                    
                    .result-summary.failed {
                        background-color: rgba(244, 67, 54, 0.1);
                    }
                    
                    .result-score {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin: 20px 0;
                    }
                    
                    .score-circle {
                        width: 120px;
                        height: 120px;
                        border-radius: 50%;
                        background: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-shadow: 0 0 0 10px rgba(106, 193, 197, 0.1);
                        margin-bottom: 15px;
                    }
                    
                    .score-circle span {
                        font-size: 2.5rem;
                        font-weight: bold;
                        color: #333;
                    }
                    
                    .success-message h4 {
                        color: #4caf50;
                    }
                    
                    .failure-message h4 {
                        color: #f44336;
                    }
                    
                    .question-review {
                        margin-top: 30px;
                    }
                    
                    .question-review h3 {
                        margin-bottom: 20px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #eee;
                    }
                    
                    .reviewed-question {
                        padding: 15px;
                        margin-bottom: 20px;
                        border-radius: 8px;
                    }
                    
                    .reviewed-question.correct {
                        background-color: rgba(76, 175, 80, 0.05);
                        border-left: 4px solid #4caf50;
                    }
                    
                    .reviewed-question.incorrect {
                        background-color: rgba(244, 67, 54, 0.05);
                        border-left: 4px solid #f44336;
                    }
                    
                    .reviewed-options {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        margin-top: 15px;
                    }
                    
                    .reviewed-option {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 15px;
                        background: white;
                        border-radius: 4px;
                        border: 1px solid #eee;
                    }
                    
                    .reviewed-option.user-selected {
                        background-color: #f0f0f0;
                    }
                    
                    .reviewed-option.correct-answer {
                        border-color: #4caf50;
                    }
                    
                    .answer-icon {
                        font-size: 1.2rem;
                    }
                    
                    .answer-icon.correct {
                        color: #4caf50;
                    }
                    
                    .answer-icon.wrong {
                        color: #f44336;
                    }
                `}</style>
            </div>
        );
    };

    // Helper function to format dates
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    // Helper function to get category color
    const getCategoryColor = (category) => {
        const categoryColors = {
            'Java': '#f44336',
            'Web Development': '#2196F3',
            'Backend Development': '#673AB7',
            'Frontend Development': '#00BCD4',
            'Database': '#009688',
            'DevOps': '#FF5722',
            'Mobile Development': '#607D8B'
        };
        
        return categoryColors[category] || '#9C27B0'; // Default color
    };

    return (
        <div className="dashboard-container">
            {/* Navigation Bar */}
            <nav className="themed-navbar">
                <div className="logo">Learning Hub</div>
                <div className="profile-menu">
                    <span className="user-name">Welcome, {username}</span>
                    <img className="avatar" src={`https://ui-avatars.com/api/?name=${username}&background=random`} alt="Profile" />
                </div>
                <button 
                    className="logout-button"
                    onClick={() => {
                        localStorage.removeItem('user');
                        window.location.href = '/';
                    }}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginLeft: '15px',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                >
                    Logout
                </button>
            </nav>
            
            {/* Main Dashboard Layout */}
            <div className="dashboard-layout">
                {/* Sidebar */}
                <aside className="dashboard-sidebar">
                    <ul className="sidebar-menu">
                        <li 
                            className={`menu-item ${activeSection === 'dashboard' ? 'active' : ''}`}
                            onClick={() => setActiveSection('dashboard')}
                        >
                            <i className="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </li>
                        <li 
                            className={`menu-item ${activeSection === 'my-courses' ? 'active' : ''}`}
                            onClick={() => setActiveSection('my-courses')}
                        >
                            <i className="fas fa-book"></i>
                            <span>My Courses</span>
                        </li>
                        <li 
                            className={`menu-item ${activeSection === 'all-courses' ? 'active' : ''}`}
                            onClick={() => setActiveSection('all-courses')}
                        >
                            <i className="fas fa-th-list"></i>
                            <span>All Courses</span>
                        </li>
                        {/* Add Assignments menu item */}
                        <li 
                            className={`menu-item ${activeSection === 'assignments' || activeSection === 'assignment-detail' ? 'active' : ''}`}
                            onClick={() => setActiveSection('assignments')}
                        >
                            <i className="fas fa-tasks"></i>
                            <span>Assignments</span>
                        </li>
                        {/* AI Assistant button */}
                        <li 
                            className={`menu-item ${isChatbotOpen ? 'active' : ''}`}
                            onClick={toggleChatbot}
                        >
                            <i className="fas fa-robot"></i>
                            <span>AI Assistant</span>
                        </li>
                    </ul>
                </aside>
                
                {/* Main Content Area */}
                <main className="dashboard-main">
                    {activeSection === 'dashboard' && renderDashboard()}
                    {activeSection === 'my-courses' && <MyCourses />}
                    {activeSection === 'all-courses' && renderAllCourses()}
                    {activeSection === 'course-detail' && renderCourseDetail()}
                    {activeSection === 'quiz' && renderQuiz()}
                    {activeSection === 'assignments' && renderAssignments()}
                    {activeSection === 'assignment-detail' && renderAssignmentDetail()}
                </main>
            </div>

            {/* API Key Form Modal */}
            {showApiKeyForm && (
                <div className="api-key-modal">
                    <div className="api-key-dialog">
                        <h3>Enter Your Gemini API Key</h3>
                        <p>To use the AI assistant, you need to provide a valid Gemini API key.</p>
                        <p className="error-message">The previous API key was invalid or expired. Please enter a new one.</p>
                        <input 
                            type="password"
                            className="api-key-input"
                            placeholder="Enter your Gemini API key"
                            onChange={(e) => setChatbotApiKey(e.target.value)}
                            value={chatbotApiKey}
                        />
                        <div className="api-key-actions">
                            <button 
                                className="cancel-button"
                                onClick={() => {
                                    setShowApiKeyForm(false);
                                    setIsChatbotOpen(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="submit-button"
                                onClick={() => handleApiKeySubmit(chatbotApiKey)}
                                disabled={!chatbotApiKey.trim()}
                            >
                                Submit
                            </button>
                        </div>
                        <p className="info-text">
                            Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noreferrer">Google AI Studio</a>
                        </p>
                    </div>
                </div>
            )}

            {/* Chatbot Modal */}
            {isChatbotOpen && !showApiKeyForm && (
                <div className="chatbot-modal">
                    <div className="chatbot-container">
                        <div className="chatbot-header">
                            <h3>Learning Assistant</h3>
                            <button className="close-chatbot" onClick={() => setIsChatbotOpen(false)}>×</button>
                        </div>
                        <div className="chatbot-content">
                            <Chatbot onApiKeyError={() => setShowApiKeyForm(true)} />
                        </div>
                    </div>
                </div>
            )}

            {/* Add styles for modals */}
            <style jsx>{`
                .chatbot-modal {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 400px;
                    height: 600px;
                    z-index: 1000;
                    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);
                    border-radius: 12px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                
                .chatbot-container {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    background-color: white;
                }
                
                .chatbot-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background: linear-gradient(135deg, #6ac1c5, #bda5ff);
                    color: white;
                }
                
                .chatbot-header h3 {
                    margin: 0;
                }
                
                .close-chatbot {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                }
                
                .chatbot-content {
                    flex-grow: 1;
                    overflow: hidden;
                }
                
                .chatbot-content > div {
                    height: 100%;
                    margin: 0;
                    border-radius: 0;
                    box-shadow: none;
                }

                /* Also show the chat button fixed at bottom right when chatbot is closed */
                @media (max-width: 600px) {
                    .chatbot-modal {
                        width: 90%;
                        height: 80%;
                    }
                }

                .api-key-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1100;
                }
                
                .api-key-dialog {
                    background-color: white;
                    padding: 25px;
                    border-radius: 10px;
                    width: 90%;
                    max-width: 450px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }
                
                .api-key-input {
                    width: 100%;
                    padding: 12px;
                    margin-top: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                }
                
                .api-key-actions {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 20px;
                    gap: 10px;
                }
                
                .cancel-button {
                    padding: 10px 15px;
                    background-color: #f2f2f2;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                .submit-button {
                    padding: 10px 15px;
                    background: linear-gradient(135deg, #6ac1c5, #bda5ff);
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                .submit-button:disabled {
                    background: #cccccc;
                    cursor: not-allowed;
                }
                
                .error-message {
                    color: #f44336;
                    background-color: rgba(244, 67, 54, 0.1);
                    padding: 10px;
                    border-radius: 4px;
                    margin-bottom: 15px;
                }
                
                .info-text {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #666;
                    text-align: center;
                }
                
                .info-text a {
                    color: #6ac1c5;
                    text-decoration: none;
                }
            `}</style>
        </div>
    );
};

export default StudentDashboard;