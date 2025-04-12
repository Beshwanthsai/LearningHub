import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Dashboard.css';

const StudentDashboard = () => {
    const [username, setUsername] = useState('');
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [quizResult, setQuizResult] = useState(null);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [completedModules, setCompletedModules] = useState({});
    const [hiddenQuizzes, setHiddenQuizzes] = useState({});
    const [readModuleContent, setReadModuleContent] = useState({});
    const [activeTab, setActiveTab] = useState('overview'); // New state for course detail tabs
    const [learningStats, setLearningStats] = useState({
        totalTimeSpent: 0,
        lastActive: null,
        streakDays: 0
    });

    const coursesData = [
        {
            id: 1,
            title: 'Web Development Fundamentals',
            description: 'Master HTML, CSS, and JavaScript',
            image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 0,
            learningObjectives: [
                'Understand core web technologies',
                'Build responsive websites',
                'Create interactive web applications'
            ],
            prerequisites: ['Basic computer knowledge'],
            duration: '8 weeks',
            modules: [
                {
                    id: 1,
                    title: 'Introduction to HTML',
                    content: 'HTML is the standard markup language for creating web pages. It describes the structure of a web page and consists of elements that tell the browser how to display the content.',
                    completed: false,
                    progress: 0,
                    estimatedTime: '2 hours',
                    quiz: {
                        question: 'What does HTML stand for?',
                        options: [
                            'Hyper Text Markup Language',
                            'High Tech Modern Language',
                            'Hybrid Text Memory Language'
                        ],
                        correct: 0
                    }
                },
                {
                    id: 2,
                    title: 'CSS Basics',
                    content: 'CSS is used to style and layout web pages. Learn about selectors, properties, and values to make your websites look beautiful.',
                    quiz: {
                        question: 'What does CSS stand for?',
                        options: [
                            'Counter Style Sheets',
                            'Cascading Style Sheets',
                            'Computer Style System'
                        ],
                        correct: 1
                    }
                },
                {
                    id: 3,
                    title: 'JavaScript Fundamentals',
                    content: 'JavaScript is a programming language that enables interactive web pages. Learn about variables, functions, and basic programming concepts.',
                    quiz: {
                        question: 'Which keyword is used to declare a variable in JavaScript?',
                        options: [
                            'var',
                            'let',
                            'both a and b'
                        ],
                        correct: 2
                    }
                }
            ]
        },
        {
            id: 2,
            title: 'React Fundamentals',
            description: 'Learn modern React development',
            image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 0,
            learningObjectives: [
                'Build React components',
                'Manage state effectively',
                'Work with React Hooks'
            ],
            prerequisites: ['JavaScript basics'],
            duration: '6 weeks',
            modules: [
                {
                    id: 1,
                    title: 'Introduction to React',
                    content: 'React is a JavaScript library for building user interfaces. Learn about components, props, and state management.',
                    quiz: {
                        question: 'What is React?',
                        options: [
                            'A programming language',
                            'A JavaScript library',
                            'A database system'
                        ],
                        correct: 1
                    }
                }
            ]
        },
        {
            id: 3,
            title: 'Python for Beginners',
            description: 'Start your programming journey with Python',
            image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 0,
            learningObjectives: [
                'Understand Python syntax',
                'Work with data structures',
                'Create simple applications'
            ],
            prerequisites: ['No prior programming experience required'],
            duration: '6 weeks',
            modules: [
                {
                    id: 1,
                    title: 'Python Basics',
                    content: 'Learn about Python syntax, variables, and basic operations. Python is known for its readability and simplicity, making it perfect for beginners.',
                    quiz: {
                        question: 'Which symbol is used for comments in Python?',
                        options: [
                            '//',
                            '#',
                            '/* */'
                        ],
                        correct: 1
                    }
                },
                {
                    id: 2,
                    title: 'Data Structures',
                    content: 'Explore Python lists, dictionaries, tuples, and sets. Learn how to manipulate data efficiently.',
                    quiz: {
                        question: 'Which of these is a mutable data structure in Python?',
                        options: [
                            'Tuple',
                            'String',
                            'List'
                        ],
                        correct: 2
                    }
                }
            ]
        },
        {
            id: 4,
            title: 'Data Science Essentials',
            description: 'Analyze and visualize data using Python',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 0,
            learningObjectives: [
                'Use pandas for data analysis',
                'Create visualizations with matplotlib',
                'Apply statistical methods'
            ],
            prerequisites: ['Basic Python knowledge'],
            duration: '10 weeks',
            modules: [
                {
                    id: 1,
                    title: 'Introduction to Pandas',
                    content: 'Learn to use pandas for data manipulation and analysis. Work with DataFrames and Series to clean and transform data.',
                    quiz: {
                        question: 'What function is used to read a CSV file in pandas?',
                        options: [
                            'read_csv()',
                            'load_csv()',
                            'import_csv()'
                        ],
                        correct: 0
                    }
                },
                {
                    id: 2,
                    title: 'Data Visualization',
                    content: 'Create powerful visualizations using matplotlib and seaborn. Learn to communicate insights effectively through graphs.',
                    quiz: {
                        question: 'Which plot is best for showing distribution?',
                        options: [
                            'Line plot',
                            'Histogram',
                            'Scatter plot'
                        ],
                        correct: 1
                    }
                }
            ]
        },
        {
            id: 5,
            title: 'Mobile App Development with Flutter',
            description: 'Build cross-platform mobile apps',
            image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 0,
            learningObjectives: [
                'Understand Flutter framework',
                'Build UI with widgets',
                'Create apps for iOS and Android'
            ],
            prerequisites: ['Basic programming experience'],
            duration: '8 weeks',
            modules: [
                {
                    id: 1,
                    title: 'Flutter Basics',
                    content: 'Learn about Dart programming language and Flutter widgets. Understand the principles of reactive UI development.',
                    quiz: {
                        question: 'What programming language is used for Flutter development?',
                        options: [
                            'JavaScript',
                            'Dart',
                            'Kotlin'
                        ],
                        correct: 1
                    }
                },
                {
                    id: 2,
                    title: 'Building User Interfaces',
                    content: 'Design beautiful UIs with Flutter widgets. Learn about layout, styling, and responsive design.',
                    quiz: {
                        question: 'Which widget is used for scrollable content in Flutter?',
                        options: [
                            'Container',
                            'ListView',
                            'Column'
                        ],
                        correct: 1
                    }
                }
            ]
        },
        {
            id: 6,
            title: 'Machine Learning Foundations',
            description: 'Introduction to AI and machine learning concepts',
            image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 0,
            learningObjectives: [
                'Understand ML algorithms',
                'Implement models with scikit-learn',
                'Solve real-world problems'
            ],
            prerequisites: ['Python basics', 'Basic statistics knowledge'],
            duration: '12 weeks',
            modules: [
                {
                    id: 1,
                    title: 'Introduction to Machine Learning',
                    content: 'Learn about supervised and unsupervised learning, regression, classification, and clustering algorithms.',
                    quiz: {
                        question: 'Which of these is NOT a type of machine learning?',
                        options: [
                            'Supervised learning',
                            'Predictive learning',
                            'Reinforcement learning'
                        ],
                        correct: 1
                    }
                },
                {
                    id: 2,
                    title: 'Building Models with scikit-learn',
                    content: 'Use scikit-learn to build and evaluate machine learning models. Learn about model selection and validation.',
                    quiz: {
                        question: 'What method is used to split data into training and testing sets?',
                        options: [
                            'train_test_split()',
                            'data_split()',
                            'split_data()'
                        ],
                        correct: 0
                    }
                }
            ]
        }
    ];

    useEffect(() => {
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
        
        // Load saved courses with progress
        const savedProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
        const savedCompletedModules = JSON.parse(localStorage.getItem('completedModules') || '{}');
        const savedReadContent = JSON.parse(localStorage.getItem('readModuleContent') || '{}');
        
        // Apply saved progress to coursesData
        const coursesWithProgress = coursesData.map(course => ({
            ...course,
            progress: savedProgress[course.id] || 0
        }));
        
        setCourses(coursesWithProgress);
        setCompletedModules(savedCompletedModules);
        setReadModuleContent(savedReadContent);
        
        const savedEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        setEnrolledCourses(savedEnrollments);

        // Load learning stats
        const savedStats = JSON.parse(localStorage.getItem('learningStats') || '{}');
        setLearningStats(savedStats);

        // Update last active date
        const updatedStats = {
            ...savedStats,
            lastActive: new Date().toISOString()
        };
        localStorage.setItem('learningStats', JSON.stringify(updatedStats));
    }, []);

    const handleEnroll = (courseId) => {
        if (!enrolledCourses.includes(courseId)) {
            const newEnrollments = [...enrolledCourses, courseId];
            setEnrolledCourses(newEnrollments);
            localStorage.setItem('enrollments', JSON.stringify(newEnrollments));
        }
    };

    // Mark module content as read
    const markContentAsRead = (courseId, moduleId) => {
        const key = `${courseId}-${moduleId}`;
        const updatedReadContent = {
            ...readModuleContent,
            [key]: true
        };
        setReadModuleContent(updatedReadContent);
        localStorage.setItem('readModuleContent', JSON.stringify(updatedReadContent));

        // Update learning stats
        const updatedStats = {
            ...learningStats,
            totalTimeSpent: learningStats.totalTimeSpent + 10, // Add estimated reading time (10 minutes)
        };
        setLearningStats(updatedStats);
        localStorage.setItem('learningStats', JSON.stringify(updatedStats));
    };

    // Check if module content has been read
    const isContentRead = (courseId, moduleId) => {
        const key = `${courseId}-${moduleId}`;
        return readModuleContent[key] === true;
    };

    // Function to calculate course progress
    const updateCourseProgress = (courseId, moduleId) => {
        // Update completed modules
        const updatedCompletedModules = { 
            ...completedModules,
            [`${courseId}-${moduleId}`]: true
        };
        setCompletedModules(updatedCompletedModules);
        localStorage.setItem('completedModules', JSON.stringify(updatedCompletedModules));
        
        // Find the course
        const course = courses.find(c => c.id === courseId);
        
        // Calculate progress percentage
        const totalModules = course.modules.length;
        const completedModulesCount = course.modules.filter(m => 
            updatedCompletedModules[`${courseId}-${m.id}`]
        ).length;
        
        const progressPercentage = Math.round((completedModulesCount / totalModules) * 100);
        
        // Update course progress
        const updatedCourses = courses.map(c => 
            c.id === courseId ? { ...c, progress: progressPercentage } : c
        );
        
        setCourses(updatedCourses);
        
        // Save progress to localStorage
        const savedProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
        const updatedProgress = { ...savedProgress, [courseId]: progressPercentage };
        localStorage.setItem('courseProgress', JSON.stringify(updatedProgress));
    };

    const handleQuizSubmit = (courseId, moduleId, answer) => {
        const course = courses.find(c => c.id === courseId);
        const module = course.modules.find(m => m.id === moduleId);
        
        if (answer === module.quiz.correct) {
            setQuizResult({
                success: true,
                message: '🎉 Congratulations! You\'ve completed this module.'
            });
            
            // Update course progress when a quiz is answered correctly
            updateCourseProgress(courseId, moduleId);
            
            // Clear the quiz result after 3 seconds
            setTimeout(() => {
                setQuizResult(null);
            }, 3000);
        } else {
            setQuizResult({
                success: false,
                message: '❌ Incorrect answer. Please try again.'
            });
            
            // Clear the quiz result after 3 seconds
            setTimeout(() => {
                setQuizResult(null);
            }, 3000);
        }
    };

    const hideQuiz = (moduleId) => {
        setHiddenQuizzes({
            ...hiddenQuizzes,
            [moduleId]: true
        });
    };
    
    const showQuiz = (moduleId) => {
        setHiddenQuizzes({
            ...hiddenQuizzes,
            [moduleId]: false
        });
    };

    const isModuleCompleted = (courseId, moduleId) => {
        return completedModules[`${courseId}-${moduleId}`] === true;
    };

    const renderProgress = () => {
        const enrolledCoursesData = courses.filter(course => enrolledCourses.includes(course.id));
        
        return (
            <div className="progress-overview">
                <div className="stats-container">
                    <div className="stat-card gradient-card">
                        <h3>Time Spent Learning</h3>
                        <p className="stat-number">{learningStats.totalTimeSpent || 0} minutes</p>
                    </div>
                    <div className="stat-card gradient-card">
                        <h3>Course Completion</h3>
                        <p className="stat-number">
                            {enrolledCoursesData.filter(c => c.progress === 100).length}/{enrolledCoursesData.length}
                        </p>
                    </div>
                    <div className="stat-card gradient-card">
                        <h3>Last Active</h3>
                        <p className="stat-number">
                            {learningStats.lastActive ? new Date(learningStats.lastActive).toLocaleDateString() : 'Today'}
                        </p>
                    </div>
                </div>

                <h2>Course Progress</h2>
                
                {enrolledCoursesData.length === 0 ? (
                    <div className="no-courses-message">
                        <p>You haven't enrolled in any courses yet.</p>
                        <button 
                            className="primary-button"
                            onClick={() => setActiveMenu('dashboard')}
                        >
                            Browse Courses
                        </button>
                    </div>
                ) : (
                    <div className="course-progress-list">
                        {enrolledCoursesData.map(course => {
                            const completedModulesCount = course.modules.filter(
                                module => isModuleCompleted(course.id, module.id)
                            ).length;
                            
                            return (
                                <div key={course.id} className="course-progress-item">
                                    <div className="course-info">
                                        <img 
                                            src={course.image} 
                                            alt={course.title} 
                                            className="course-thumbnail" 
                                        />
                                        <div className="course-details">
                                            <h3>{course.title}</h3>
                                            <div className="progress-bar-container">
                                                <div className="progress-bar">
                                                    <div 
                                                        className="progress-fill"
                                                        style={{width: `${course.progress}%`}}
                                                    ></div>
                                                </div>
                                                <span className="progress-percentage">{course.progress}%</span>
                                            </div>
                                            <div className="module-completion">
                                                <p>{completedModulesCount} of {course.modules.length} modules completed</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        className="resume-button"
                                        onClick={() => {
                                            setSelectedCourse(course);
                                            setActiveMenu('my-courses');
                                        }}
                                    >
                                        {course.progress > 0 ? 'Resume Course' : 'Start Course'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    const renderContent = () => {
        switch(activeMenu) {
            case 'dashboard':
                return (
                    <>
                        <div className="stats-container">
                            <div className="stat-card gradient-card">
                                <h3>Enrolled Courses</h3>
                                <p className="stat-number">{enrolledCourses.length}</p>
                            </div>
                            <div className="stat-card gradient-card">
                                <h3>Completed</h3>
                                <p className="stat-number">
                                    {courses.filter(c => enrolledCourses.includes(c.id) && c.progress === 100).length}
                                </p>
                            </div>
                            <div className="stat-card gradient-card">
                                <h3>Certificates</h3>
                                <p className="stat-number">
                                    {courses.filter(c => enrolledCourses.includes(c.id) && c.progress === 100).length}
                                </p>
                            </div>
                        </div>
                        <div className="courses-section">
                            <h2>Available Courses</h2>
                            <div className="courses-grid">
                                {courses.map(course => (
                                    <motion.div
                                        key={course.id}
                                        className="course-card"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className="course-image-container">
                                            <img 
                                                src={course.image} 
                                                alt={course.title} 
                                                className="course-image" 
                                            />
                                        </div>
                                        <div className="course-content">
                                            <h3>{course.title}</h3>
                                            <p>{course.description}</p>
                                            <div className="course-meta-info">
                                                <span className="course-duration">
                                                    <i className="fas fa-clock"></i> {course.duration}
                                                </span>
                                                <span className="course-modules">
                                                    <i className="fas fa-book"></i> {course.modules.length} modules
                                                </span>
                                            </div>
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill"
                                                    style={{width: `${course.progress}%`}}
                                                ></div>
                                            </div>
                                            <p className="progress-text">{course.progress}% Complete</p>
                                            {enrolledCourses.includes(course.id) ? (
                                                <button
                                                    onClick={() => setSelectedCourse(course)}
                                                    className="continue-button"
                                                >
                                                    Continue Learning
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEnroll(course.id)}
                                                    className="enroll-button"
                                                >
                                                    Enroll Now
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        
                        {selectedCourse && (
                            <div className="selected-course-overlay">
                                <div className="selected-course-content">
                                    <button 
                                        className="close-button" 
                                        onClick={() => setSelectedCourse(null)}
                                    >
                                        &times;
                                    </button>
                                    <h2>{selectedCourse.title}</h2>
                                    <div className="module-list">
                                        {selectedCourse.modules.map(module => 
                                            renderModule(module, selectedCourse)
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                );
            case 'my-courses':
                return (
                    <div className="enrolled-courses">
                        <h2>My Enrolled Courses</h2>
                        <div className="courses-grid">
                            {courses.filter(course => enrolledCourses.includes(course.id)).map(course => (
                                <motion.div
                                    key={course.id}
                                    className="enrolled-course-card"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="course-image-container">
                                        <img 
                                            src={course.image} 
                                            alt={course.title} 
                                            className="course-image" 
                                        />
                                    </div>
                                    <div className="course-content">
                                        <h3>{course.title}</h3>
                                        <div className="course-overview">
                                            <h4>What you'll learn:</h4>
                                            <ul className="objectives-list">
                                                {course.learningObjectives?.map((obj, idx) => (
                                                    <li key={idx}>{obj}</li>
                                                )) || <li>Course content available after enrollment</li>}
                                            </ul>
                                            <div className="course-meta">
                                                <span><i className="fas fa-clock"></i> Duration: {course.duration || 'N/A'}</span>
                                                <span><i className="fas fa-chart-line"></i> Progress: {course.progress || 0}%</span>
                                            </div>
                                        </div>
                                        <button 
                                            className="view-modules-button"
                                            onClick={() => setSelectedCourse(course)}
                                        >
                                            View Modules
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
            case 'certificates':
                return (
                    <div className="certificates-section">
                        <h2>My Certificates</h2>
                        <div className="certificates-container">
                            {courses
                                .filter(course => enrolledCourses.includes(course.id) && course.progress === 100)
                                .map(course => (
                                    <div key={course.id} className="certificate-card">
                                        <div className="certificate-icon">
                                            <i className="fas fa-certificate"></i>
                                        </div>
                                        <div className="certificate-details">
                                            <h3>{course.title}</h3>
                                            <p>Completed on: {new Date().toLocaleDateString()}</p>
                                            <button className="view-certificate-button">
                                                View Certificate
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                            
                            {courses.filter(course => enrolledCourses.includes(course.id) && course.progress === 100).length === 0 && (
                                <div className="no-certificates-message">
                                    <p>You haven't earned any certificates yet. Complete a course to earn your first certificate!</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'progress':
                return renderProgress();
            default:
                return null;
        }
    };

    // Render a module with proper learning flow
    const renderModule = (module, course) => {
        const moduleKey = `${course.id}-${module.id}`;
        const isCompleted = isModuleCompleted(course.id, module.id);
        const hasReadContent = isContentRead(course.id, module.id);
        
        return (
            <div key={module.id} className={`module-item ${isCompleted ? 'completed' : ''}`}>
                <h4>{module.title}</h4>
                <p className="module-content">{module.content}</p>
                
                {!isCompleted && !hasReadContent && (
                    <button 
                        className="mark-read-button"
                        onClick={() => markContentAsRead(course.id, module.id)}
                    >
                        Mark as Read
                    </button>
                )}
                
                {!isCompleted && hasReadContent && module.quiz && !hiddenQuizzes[moduleKey] && (
                    <div className="quiz-section">
                        <div className="quiz-header">
                            <p className="quiz-question">{module.quiz.question}</p>
                            <button 
                                className="close-quiz-button" 
                                onClick={() => hideQuiz(moduleKey)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="quiz-options">
                            {module.quiz.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleQuizSubmit(course.id, module.id, idx)}
                                    className="quiz-option"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                {!isCompleted && hasReadContent && module.quiz && hiddenQuizzes[moduleKey] && (
                    <div className="show-quiz-container">
                        <button 
                            className="show-quiz-button"
                            onClick={() => showQuiz(moduleKey)}
                        >
                            Take Module Quiz
                        </button>
                    </div>
                )}
                
                {isCompleted && (
                    <div className="completed-module">
                        <p className="success-text">✓ Module completed</p>
                    </div>
                )}
            </div>
        );
    };

    // Update the selected course view to use the new module rendering
    useEffect(() => {
        if (selectedCourse) {
            const coursesElement = document.querySelector('.selected-course-content .module-list');
            if (coursesElement) {
                coursesElement.innerHTML = '';
                selectedCourse.modules.forEach(module => {
                    const moduleElement = document.createElement('div');
                    moduleElement.className = `module-item ${isModuleCompleted(selectedCourse.id, module.id) ? 'completed' : ''}`;
                    moduleElement.innerHTML = `
                        <h4>${module.title}</h4>
                        <p class="module-content">${module.content}</p>
                    `;
                    coursesElement.appendChild(moduleElement);
                });
            }
        }
    }, [selectedCourse]);

    // Reset active tab when a new course is selected
    useEffect(() => {
        if (selectedCourse) {
            setActiveTab('overview');
        }
    }, [selectedCourse]);

    return (
        <div className="dashboard-container">
            <nav className="themed-navbar">
                <div className="logo">Learning Hub</div>
                <div className="profile-menu">
                    <span className="user-name">Welcome, {username}</span>
                    <img className="avatar" src={`https://ui-avatars.com/api/?name=${username}&background=random`} alt="Profile" />
                </div>
            </nav>

            <div className="dashboard-grid">
                <aside className="sidebar">
                    <div className="menu-items">
                        <a 
                            className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
                            onClick={() => setActiveMenu('dashboard')}
                        >
                            <i className="fas fa-home"></i>
                            <span>Dashboard</span>
                        </a>
                        <a 
                            className={`menu-item ${activeMenu === 'my-courses' ? 'active' : ''}`}
                            onClick={() => setActiveMenu('my-courses')}
                        >
                            <i className="fas fa-book"></i>
                            <span>My Courses</span>
                        </a>
                        <a 
                            className={`menu-item ${activeMenu === 'certificates' ? 'active' : ''}`}
                            onClick={() => setActiveMenu('certificates')}
                        >
                            <i className="fas fa-certificate"></i>
                            <span>Certificates</span>
                        </a>
                        <a 
                            className={`menu-item ${activeMenu === 'progress' ? 'active' : ''}`}
                            onClick={() => setActiveMenu('progress')}
                        >
                            <i className="fas fa-chart-line"></i>
                            <span>Progress</span>
                        </a>
                    </div>
                </aside>

                <main className="main-content">
                    <AnimatePresence>
                        {quizResult && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`quiz-alert ${quizResult.success ? 'success' : 'error'}`}
                            >
                                {quizResult.message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {renderContent()}
                </main>
            </div>

            {selectedCourse && (
                <div className="selected-course-overlay">
                    <div className="selected-course-content">
                        <button 
                            className="close-button" 
                            onClick={() => setSelectedCourse(null)}
                        >
                            &times;
                        </button>
                        
                        <div className="course-header">
                            <img 
                                src={selectedCourse.image} 
                                alt={selectedCourse.title} 
                                className="course-detail-image"
                            />
                            <div className="course-title-section">
                                <h2>{selectedCourse.title}</h2>
                                <p className="course-description">{selectedCourse.description}</p>
                                <div className="course-progress-header">
                                    <div className="progress-bar">
                                        <div 
                                            className="progress-fill"
                                            style={{width: `${selectedCourse.progress}%`}}
                                        ></div>
                                    </div>
                                    <span className="progress-text">{selectedCourse.progress}% Complete</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="course-tabs">
                            <button 
                                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </button>
                            <button 
                                className={`tab-button ${activeTab === 'modules' ? 'active' : ''}`}
                                onClick={() => setActiveTab('modules')}
                            >
                                Modules
                            </button>
                            <button 
                                className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
                                onClick={() => setActiveTab('resources')}
                            >
                                Resources
                            </button>
                        </div>
                        
                        <div className="tab-content">
                            {activeTab === 'overview' && (
                                <div className="course-overview-tab">
                                    <div className="course-details-grid">
                                        <div className="detail-card">
                                            <h3>Course Duration</h3>
                                            <p><i className="fas fa-clock"></i> {selectedCourse.duration}</p>
                                        </div>
                                        <div className="detail-card">
                                            <h3>Total Modules</h3>
                                            <p><i className="fas fa-book"></i> {selectedCourse.modules.length} modules</p>
                                        </div>
                                        <div className="detail-card">
                                            <h3>Completion Status</h3>
                                            <p><i className="fas fa-chart-line"></i> {selectedCourse.progress}% complete</p>
                                        </div>
                                    </div>
                                    
                                    <div className="course-section">
                                        <h3>Course Objectives</h3>
                                        <ul className="objectives-list detailed">
                                            {selectedCourse.learningObjectives?.map((objective, idx) => (
                                                <li key={idx}>
                                                    <i className="fas fa-check-circle"></i>
                                                    {objective}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="course-section">
                                        <h3>Prerequisites</h3>
                                        <ul className="prerequisites-list">
                                            {selectedCourse.prerequisites?.map((prerequisite, idx) => (
                                                <li key={idx}>
                                                    <i className="fas fa-arrow-right"></i>
                                                    {prerequisite}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="course-section">
                                        <h3>Course Description</h3>
                                        <p className="course-full-description">
                                            This comprehensive {selectedCourse.title} course is designed to give you 
                                            a solid foundation in {selectedCourse.description.toLowerCase()}. 
                                            Over the course of {selectedCourse.duration.toLowerCase()}, you'll gain hands-on 
                                            experience through practical exercises and projects that reinforce the concepts you learn.
                                            The course is structured to progressively build your skills from fundamentals to more advanced topics.
                                        </p>
                                    </div>
                                </div>
                            )}
                            
                            {activeTab === 'modules' && (
                                <div className="modules-tab">
                                    <div className="module-list">
                                        {selectedCourse.modules.map((module, index) => (
                                            <div key={module.id} className="module-expanded-item">
                                                <div className="module-header">
                                                    <div className="module-number">{index + 1}</div>
                                                    <h4>{module.title}</h4>
                                                    <div className="module-status">
                                                        {isModuleCompleted(selectedCourse.id, module.id) ? (
                                                            <span className="completed-badge">Completed</span>
                                                        ) : (
                                                            <span className="pending-badge">Pending</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="module-details">
                                                    <h5>Learning Content:</h5>
                                                    <p className="module-content">{module.content}</p>
                                                    <p className="estimated-time">
                                                        <i className="fas fa-clock"></i> Estimated time: {module.estimatedTime || '1 hour'}
                                                    </p>
                                                    
                                                    {renderModule(module, selectedCourse)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {activeTab === 'resources' && (
                                <div className="resources-tab">
                                    <h3>Additional Resources</h3>
                                    <div className="resources-list">
                                        <div className="resource-item">
                                            <i className="fas fa-file-pdf"></i>
                                            <span>Course PDF Materials</span>
                                            <button className="download-button">Download</button>
                                        </div>
                                        <div className="resource-item">
                                            <i className="fas fa-video"></i>
                                            <span>Video Tutorials</span>
                                            <button className="view-button">View</button>
                                        </div>
                                        <div className="resource-item">
                                            <i className="fas fa-link"></i>
                                            <span>External References</span>
                                            <button className="view-button">Access Links</button>
                                        </div>
                                        <div className="resource-item">
                                            <i className="fas fa-laptop-code"></i>
                                            <span>Practice Exercises</span>
                                            <button className="view-button">Start</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;