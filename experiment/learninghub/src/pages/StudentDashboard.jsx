import React, { useState, useEffect } from 'react';

import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import './Dashboard.css';

// Register Chart.js components
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
    const [viewingModules, setViewingModules] = useState(null); // New state for viewing modules
    
    // Mock data for courses and resources
    const coursesData = [
        {
            id: 1,
            title: 'Web Development Fundamentals',
            description: 'Master HTML, CSS, and JavaScript',
            image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
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
            image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
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
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
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
            image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 0,
            instructor: 'Dr. Robert Park',
            recommended: true
        }
    ];
    
    // Completed certificates
    const certificatesData = [
        {
            id: 1,
            courseId: 1,
            title: 'Web Development Fundamentals',
            issueDate: '2023-05-15',
            image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
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
        // For pie chart
        const pieData = {
            labels: ['Completed', 'In Progress', 'Not Started'],
            datasets: [
                {
                    data: [
                        courses.filter(c => c.progress === 100).length,
                        courses.filter(c => c.progress > 0 && c.progress < 100).length,
                        courses.filter(c => c.progress === 0).length
                    ],
                    backgroundColor: ['#4CAF50', '#FFC107', '#E0E0E0'],
                    borderWidth: 0
                }
            ]
        };
        
        // For bar chart (course progress)
        const barData = {
            labels: courses.filter(c => enrolledCourses.includes(c.id)).map(c => c.title),
            datasets: [
                {
                    label: 'Course Progress (%)',
                    data: courses.filter(c => enrolledCourses.includes(c.id)).map(c => c.progress),
                    backgroundColor: '#3f51b5',
                    borderRadius: 5
                }
            ]
        };
        
        return { pieData, barData };
    };
    
    // Get recommended courses
    const getRecommendedCourses = () => {
        // In a real app, this would use more sophisticated recommendation logic
        return courses.filter(course => course.recommended || course.progress === 0);
    };
    
    // Render dashboard section
    const renderDashboard = () => {
        const { pieData, barData } = prepareChartData();
        const enrolledCoursesData = courses.filter(course => enrolledCourses.includes(course.id));
        
        return (
            <div className="dashboard-content">
                <h2 className="section-title">Learning Dashboard</h2>
                
                {/* Stats overview */}
                <div className="stats-container">
                    <div className="stat-card">
                        <h3>Enrolled Courses</h3>
                        <p className="stat-value">{enrolledCourses.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Completed Courses</h3>
                        <p className="stat-value">{enrolledCoursesData.filter(c => c.progress === 100).length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Certificates Earned</h3>
                        <p className="stat-value">{certificates.length}</p>
                    </div>
                </div>
                
                {/* Render modules view if a course is selected for viewing modules */}
                {viewingModules ? (
                    renderModulesView(viewingModules)
                ) : (
                    <>
                        {/* Progress visualization */}
                        <div className="progress-visualization">
                            <div className="chart-container">
                                <h3>Course Status</h3>
                                <div className="chart-wrapper">
                                    <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                            <div className="chart-container wide">
                                <h3>Course Progress</h3>
                                <div className="chart-wrapper">
                                    <Bar 
                                        data={barData} 
                                        options={{
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                    max: 100
                                                }
                                            },
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Recent courses */}
                        <div className="recent-courses">
                            <h3>Continue Learning</h3>
                            <div className="courses-grid">
                                {enrolledCoursesData.filter(course => course.progress > 0 && course.progress < 100)
                                    .slice(0, 3)
                                    .map(course => (
                                        <div key={course.id} className="course-card">
                                            <div className="course-image">
                                                <img src={course.image} alt={course.title} />
                                            </div>
                                            <div className="course-info">
                                                <h4>{course.title}</h4>
                                                <div className="progress-container">
                                                    <div className="progress-bar">
                                                        <div className="progress-fill" style={{width: `${course.progress}%`}}></div>
                                                    </div>
                                                    <span className="progress-text">{course.progress}% complete</span>
                                                </div>
                                                <div className="course-buttons">
                                                    <button 
                                                        className="continue-button"
                                                        onClick={() => {
                                                            setSelectedCourse(course);
                                                            setActiveSection('course-detail');
                                                        }}
                                                    >
                                                        Continue
                                                    </button>
                                                    <button 
                                                        className="view-modules-button"
                                                        onClick={() => setViewingModules(course)}
                                                    >
                                                        View Modules
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        
                        {/* Recommended courses */}
                        <div className="recommended-courses">
                            <h3>Recommended for You</h3>
                            <div className="courses-grid">
                                {getRecommendedCourses().slice(0, 3).map(course => (
                                    <div key={course.id} className="course-card recommended">
                                        <div className="course-image">
                                            <img src={course.image} alt={course.title} />
                                            {course.recommended && <span className="recommended-badge">Recommended</span>}
                                        </div>
                                        <div className="course-info">
                                            <h4>{course.title}</h4>
                                            <p>{course.description}</p>
                                            <p className="instructor">By {course.instructor}</p>
                                            <div className="course-buttons">
                                                <button 
                                                    className="enroll-button"
                                                    onClick={() => {
                                                        setSelectedCourse(course);
                                                        setActiveSection('course-detail');
                                                    }}
                                                >
                                                    {enrolledCourses.includes(course.id) ? 'Continue' : 'Enroll Now'}
                                                </button>
                                                <button 
                                                    className="view-modules-button"
                                                    onClick={() => setViewingModules(course)}
                                                >
                                                    View Modules
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
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
                            <h4>{module.title}</h4>
                            <p>{module.description}</p>
                            
                            <div className="module-videos">
                                <h5>Module Videos</h5>
                                <div className="videos-container">
                                    {module.videos && module.videos.map(video => (
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
                        
                        <div className="progress-container large">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{width: `${selectedCourse.progress}%`}}></div>
                            </div>
                            <span className="progress-text">{selectedCourse.progress}% complete</span>
                        </div>
                    </div>
                </div>
                
                <div className="course-modules">
                    <h3>Course Modules</h3>
                    
                    {selectedCourse.modules?.map(module => {
                        const isCompleted = completedModules[`${selectedCourse.id}-${module.id}`];
                        
                        return (
                            <div 
                                key={module.id} 
                                className={`module-card ${isCompleted ? 'completed' : ''}`}
                            >
                                <div className="module-header">
                                    <h4>{module.title}</h4>
                                    {isCompleted && <span className="completed-badge">✓ Completed</span>}
                                </div>
                                
                                <p>{module.description}</p>
                                
                                <div className="module-resources">
                                    <h5>Learning Resources</h5>
                                    <ul className="resources-list">
                                        {module.resources?.map(resource => (
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
    
    // Render resources section
    const renderResources = () => {
        // Group resources by course
        const resourcesByCourse = courses
            .filter(course => enrolledCourses.includes(course.id))
            .map(course => {
                const courseResources = [];
                course.modules?.forEach(module => {
                    if (module.resources) {
                        courseResources.push(...module.resources.map(resource => ({
                            ...resource,
                            moduleTitle: module.title,
                            courseTitle: course.title
                        })));
                    }
                });
                
                return {
                    courseId: course.id,
                    courseTitle: course.title,
                    resources: courseResources
                };
            })
            .filter(item => item.resources.length > 0);
            
        return (
            <div className="resources-content">
                <h2 className="section-title">Learning Resources</h2>
                
                {resourcesByCourse.length === 0 ? (
                    <div className="no-resources">
                        <p>No resources available for your enrolled courses.</p>
                    </div>
                ) : (
                    resourcesByCourse.map(courseResources => (
                        <div key={courseResources.courseId} className="course-resources">
                            <h3>{courseResources.courseTitle}</h3>
                            <div className="resources-table">
                                <div className="table-header">
                                    <div className="col-type">Type</div>
                                    <div className="col-title">Title</div>
                                    <div className="col-module">Module</div>
                                    <div className="col-actions">Actions</div>
                                </div>
                                {courseResources.resources.map(resource => (
                                    <div key={resource.id} className="resource-row">
                                        <div className="col-type">
                                            {resource.type === 'pdf' && <i className="fas fa-file-pdf"></i>}
                                            {resource.type === 'video' && <i className="fas fa-video"></i>}
                                            {resource.type === 'document' && <i className="fas fa-file-alt"></i>}
                                            {resource.type}
                                        </div>
                                        <div className="col-title">{resource.title}</div>
                                        <div className="col-module">{resource.moduleTitle}</div>
                                        <div className="col-actions">
                                            <button className="view-resource">View</button>
                                            <button className="download-resource">
                                                <i className="fas fa-download"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        );
    };

    // Main render method
    return (
        <div className="dashboard-container">
            {/* Navigation Bar */}
            <nav className="themed-navbar">
                <div className="logo">Learning Hub</div>
                <div className="profile-menu">
                    <span className="user-name">Welcome, {username}</span>
                    <img className="avatar" src={`https://ui-avatars.com/api/?name=${username}&background=random`} alt="Profile" />
                </div>
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
                            className={`menu-item ${activeSection === 'courses' ? 'active' : ''}`}
                            onClick={() => setActiveSection('courses')}
                        >
                            <i className="fas fa-book"></i>
                            <span>My Courses</span>
                        </li>
                        <li 
                            className={`menu-item ${activeSection === 'resources' ? 'active' : ''}`}
                            onClick={() => setActiveSection('resources')}
                        >
                            <i className="fas fa-file-alt"></i>
                            <span>Resources</span>
                        </li>
                        <li 
                            className={`menu-item ${activeSection === 'certificates' ? 'active' : ''}`}
                            onClick={() => setActiveSection('certificates')}
                        >
                            <i className="fas fa-certificate"></i>
                            <span>Certificates</span>
                        </li>
                    </ul>
                </aside>
                
                {/* Main Content Area */}
                <main className="dashboard-main">
                    {activeSection === 'dashboard' && renderDashboard()}
                    {activeSection === 'courses' && renderCourses()}
                    {activeSection === 'course-detail' && renderCourseDetail()}
                    {activeSection === 'quiz' && renderQuiz()}
                    {activeSection === 'resources' && renderResources()}
                    {activeSection === 'certificates' && renderCertificates()}
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;