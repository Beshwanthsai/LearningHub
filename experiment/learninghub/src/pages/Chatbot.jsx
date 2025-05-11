import React, { useState, useEffect } from 'react';

// Specific question-answer pairs for educational topics
const specificQuestionsAnswers = [
  {
    question: "What is a variable in programming?",
    answer: "A variable in programming is a named storage location that contains data which can be modified during program execution. Variables have a data type, name, and value. For example, in JavaScript: `let score = 10;` creates a variable named 'score' with the value 10."
  },
  {
    question: "How do loops work in programming?",
    answer: "Loops in programming execute a block of code repeatedly until a specified condition is met. Common types include:\n\n1. For loops - execute for a predetermined number of iterations\n2. While loops - execute as long as a condition is true\n3. Do-while loops - execute at least once, then continue if condition is true\n4. For-each/for-in loops - iterate over elements in collections"
  },
  {
    question: "What are functions in programming?",
    answer: "Functions are reusable blocks of code designed to perform specific tasks. They help organize code, avoid repetition, and increase readability. Functions typically accept input parameters, execute statements, and return values. Example in JavaScript: `function add(a, b) { return a + b; }`"
  },
  {
    question: "How do I learn JavaScript?",
    answer: "To learn JavaScript effectively:\n1. Start with basic syntax and concepts (variables, data types, operators)\n2. Learn about functions, objects, and arrays\n3. Understand DOM manipulation for web development\n4. Practice with small projects like calculators or todo lists\n5. Explore frameworks like React or Vue after mastering the basics\n6. Use resources like MDN Web Docs, freeCodeCamp, or Codecademy"
  },
  {
    question: "What is object-oriented programming?",
    answer: "Object-Oriented Programming (OOP) is a programming paradigm based on the concept of 'objects' that contain data and code. OOP has four main principles:\n\n1. Encapsulation - bundling data and methods that operate on that data\n2. Inheritance - allowing classes to inherit properties and methods from parent classes\n3. Polymorphism - allowing objects to take different forms depending on context\n4. Abstraction - hiding complex implementation details while showing only necessary features"
  },
  {
    question: "How do I solve quadratic equations?",
    answer: "To solve a quadratic equation in the form ax² + bx + c = 0:\n\n1. Use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a\n2. Calculate the discriminant (b² - 4ac)\n3. If discriminant > 0: two distinct real solutions\n4. If discriminant = 0: one real solution (repeated root)\n5. If discriminant < 0: two complex conjugate solutions\n\nExample: For x² + 5x + 6 = 0\na = 1, b = 5, c = 6\nx = (-5 ± 1) / 2\nx = -3 or x = -2"
  },
  {
    question: "What is the Pythagorean theorem?",
    answer: "The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) equals the sum of squares of the other two sides.\n\nMathematically: a² + b² = c², where c is the hypotenuse and a and b are the other two sides.\n\nThis fundamental theorem is used extensively in geometry, trigonometry, physics, and engineering applications."
  },
  {
    question: "What are Newton's laws of motion?",
    answer: "Newton's three laws of motion are:\n\n1. First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force.\n\n2. Second Law: Force equals mass times acceleration (F = ma). The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.\n\n3. Third Law: For every action, there is an equal and opposite reaction. When one body exerts a force on a second body, the second body exerts a force of equal magnitude and opposite direction on the first body."
  },
  {
    question: "What is photosynthesis?",
    answer: "Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose (sugar).\n\nBasic equation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n\nThe process occurs primarily in plant leaf cells containing chloroplasts. It consists of two main stages:\n1. Light-dependent reactions: Capture light energy to produce ATP and NADPH\n2. Calvin cycle (light-independent reactions): Uses ATP and NADPH to convert CO₂ into glucose"
  },
  {
    question: "What are the best study techniques?",
    answer: "Effective study techniques based on cognitive science include:\n\n1. Spaced Repetition: Reviewing material at increasing intervals over time\n2. Active Recall: Testing yourself instead of passive re-reading\n3. The Pomodoro Technique: 25-minute focused study sessions with 5-minute breaks\n4. Feynman Technique: Explaining concepts in simple terms to identify knowledge gaps\n5. Mind Mapping: Creating visual representations of related concepts\n6. Interleaving: Mixing different topics in one study session\n7. Retrieval Practice: Actively trying to remember information without looking at notes\n\nThese methods promote deeper understanding and better long-term retention than highlighting or re-reading."
  },
  {
    question: "How can I improve my focus while studying?",
    answer: "To improve focus while studying:\n\n1. Eliminate distractions (silence notifications, use apps like Forest or Focus@Will)\n2. Create a dedicated study environment\n3. Use the Pomodoro Technique (25 min work, 5 min break)\n4. Practice mindfulness meditation to train attention\n5. Stay hydrated and maintain proper nutrition\n6. Exercise regularly to improve cognitive function\n7. Get adequate sleep (7-9 hours)\n8. Break large tasks into smaller, manageable chunks\n9. Set clear, specific goals for each study session\n10. Consider background noise options like white noise or instrumental music if complete silence is distracting"
  },
  {
    question: "What is the difference between mitosis and meiosis?",
    answer: "Mitosis vs. Meiosis:\n\nMitosis:\n- Produces 2 diploid cells identical to parent cell\n- One division phase\n- No genetic recombination\n- Occurs in somatic cells\n- Purpose: growth, repair, asexual reproduction\n\nMeiosis:\n- Produces 4 haploid cells with unique genetic makeup\n- Two division phases (Meiosis I and II)\n- Includes genetic recombination (crossing over)\n- Occurs in sex cells (gametes)\n- Purpose: sexual reproduction, genetic diversity\n\nThe key difference is that mitosis maintains chromosome number for body growth/repair, while meiosis reduces chromosome number for reproduction."
  },
  {
    question: "How do I write a good essay?",
    answer: "Writing an effective essay involves:\n\n1. Planning and Research:\n   - Understand the prompt or question\n   - Research thoroughly using reliable sources\n   - Create an outline with main points and evidence\n\n2. Structure:\n   - Introduction: Hook, context, and clear thesis statement\n   - Body paragraphs: Topic sentence, evidence, analysis, transition\n   - Conclusion: Restate thesis, summarize key points, broader implications\n\n3. Writing Process:\n   - Draft without perfectionism\n   - Use clear, concise language\n   - Create smooth transitions between ideas\n   - Support claims with evidence and examples\n\n4. Revision:\n   - Check for logical flow and argument coherence\n   - Ensure proper citation format\n   - Proofread for grammar, spelling, and punctuation\n   - Get feedback if possible"
  },
  {
    question: "What are the planets in our solar system?",
    answer: "The eight planets in our solar system, in order from the Sun, are:\n\n1. Mercury - smallest planet, closest to the Sun\n2. Venus - hottest planet due to greenhouse effect\n3. Earth - our home planet, only known planet with life\n4. Mars - the 'Red Planet' due to iron oxide on its surface\n5. Jupiter - largest planet, a gas giant with a Great Red Spot\n6. Saturn - known for its prominent ring system\n7. Uranus - rotates on its side, appears blue-green due to methane\n8. Neptune - windiest planet with dark blue appearance\n\nPluto was reclassified as a dwarf planet in 2006."
  },
  {
    question: "What is the scientific method?",
    answer: "The scientific method is a systematic approach to investigation that scientists use to observe natural phenomena. The steps include:\n\n1. Ask a question based on observations\n2. Research existing knowledge about the topic\n3. Formulate a hypothesis (testable explanation)\n4. Design and conduct experiments to test the hypothesis\n5. Collect and analyze data\n6. Draw conclusions\n7. Communicate results\n8. Peer review and replication by other scientists\n\nThe process is iterative, with new questions arising from experimental results. It emphasizes empirical evidence, measurable results, and logical reasoning to develop and refine scientific theories."
  },
  
  // Frontend Development Questions
  {
    question: "What is frontend development?",
    answer: "Frontend development focuses on creating the user interface and user experience of a website or application that users interact with directly. It involves implementing the visual elements, layouts, and interactive features using:\n\n1. HTML - For structure and content\n2. CSS - For styling and layout\n3. JavaScript - For interactivity and dynamic functionality\n\nFrontend developers also work with tools like CSS preprocessors (SASS, LESS), JavaScript frameworks (React, Vue, Angular), build tools (Webpack, Parcel), and design systems to create responsive, accessible, and performant user interfaces."
  },
  {
    question: "What are the main frontend frameworks?",
    answer: "The main frontend frameworks in 2023-2024 include:\n\n1. React - Developed by Facebook, focused on component-based architecture\n2. Vue.js - Progressive framework known for its simplicity and flexibility\n3. Angular - Full-featured framework by Google with comprehensive tooling\n4. Svelte - Compiler-based approach that shifts work to build time\n5. Next.js - React framework for server-side rendering and static generation\n6. Nuxt.js - Vue equivalent of Next.js\n7. Solid.js - Performance-focused reactive framework\n\nEach has different strengths, community support, and learning curves. React currently has the largest market share and job opportunities."
  },
  {
    question: "What is responsive web design?",
    answer: "Responsive web design is an approach that makes web pages render well on all devices and screen sizes. Key principles include:\n\n1. Fluid grids - Using relative units (%, rem) instead of fixed pixels\n2. Flexible images - Making images scale properly with viewport changes\n3. Media queries - Applying different CSS styles based on device characteristics\n4. Mobile-first approach - Designing for mobile screens first, then enhancing for larger screens\n\nImplementation techniques include CSS frameworks like Bootstrap or Tailwind CSS, CSS Grid and Flexbox for layouts, viewport meta tags, and testing across multiple devices."
  },
  
  // Backend Development Questions
  {
    question: "What is backend development?",
    answer: "Backend development involves building and maintaining the server-side of web applications. It focuses on:\n\n1. Servers - Setting up and configuring web servers\n2. Databases - Designing database schemas and writing queries\n3. APIs - Creating endpoints for frontend applications to consume\n4. Authentication - Implementing secure user login systems\n5. Business Logic - Processing data and implementing application functionality\n\nCommon backend technologies include Node.js, Python (Django, Flask), Ruby on Rails, Java (Spring), PHP (Laravel), and databases like PostgreSQL, MySQL, MongoDB, and Redis. Backend developers are responsible for application performance, security, and data integrity."
  },
  {
    question: "What are REST APIs?",
    answer: "REST (Representational State Transfer) APIs are architectural guidelines for building web services that focus on system resources. Key characteristics include:\n\n1. Stateless - Each request contains all necessary information\n2. Client-server architecture - Separation of concerns\n3. Cacheable - Responses must define themselves as cacheable or non-cacheable\n4. Uniform interface - Resources are identified in requests, representations are used for manipulation\n5. Layered system - Client can't tell if connected directly to end server\n\nREST APIs typically use HTTP methods:\n- GET: Retrieve resource(s)\n- POST: Create a new resource\n- PUT: Update a resource (replace)\n- PATCH: Partially update a resource\n- DELETE: Remove a resource\n\nResponses usually return JSON or XML data and appropriate HTTP status codes."
  },
  {
    question: "What are databases and how are they used in backend development?",
    answer: "Databases are organized collections of data stored and accessed electronically. In backend development, they serve as persistent storage for application data.\n\nTypes of databases:\n1. Relational (SQL): MySQL, PostgreSQL, SQL Server\n   - Use tables, rows, columns, and relationships\n   - ACID compliance ensures data integrity\n   - Best for structured data with clear relationships\n\n2. NoSQL: MongoDB, Cassandra, Redis\n   - Document, key-value, wide-column, or graph-based\n   - More flexible schema design\n   - Better for unstructured data and horizontal scaling\n\nBackend developers work with databases by:\n- Designing database schemas\n- Writing queries and using ORMs (Object-Relational Mappers)\n- Implementing data validation and sanitization\n- Optimizing query performance\n- Setting up data migration strategies\n- Implementing backup and recovery systems"
  },
  
  // Full Stack Development Questions
  {
    question: "What is full stack development?",
    answer: "Full stack development covers both frontend and backend aspects of web application development. A full stack developer works with:\n\n1. Frontend technologies: HTML, CSS, JavaScript, frameworks like React/Vue/Angular\n2. Backend technologies: Server languages (Node.js, Python, Ruby, etc.), APIs, and business logic\n3. Databases: SQL and/or NoSQL database systems\n4. DevOps: Deployment, CI/CD pipelines, and server configuration\n\nPopular full stack combinations include:\n- MERN: MongoDB, Express, React, Node.js\n- MEAN: MongoDB, Express, Angular, Node.js\n- LAMP: Linux, Apache, MySQL, PHP\n- Django or Flask with React/Vue and PostgreSQL\n\nFull stack developers need broad knowledge across multiple technologies but may not have the same depth of specialization as dedicated frontend or backend developers."
  },
  {
    question: "What is the MERN stack?",
    answer: "The MERN stack is a popular full-stack JavaScript framework for building web applications. It consists of:\n\n1. MongoDB - NoSQL document database for storing data as JSON-like documents\n2. Express.js - Backend web application framework for Node.js for building APIs\n3. React - Frontend JavaScript library for building user interfaces\n4. Node.js - JavaScript runtime environment for executing server-side code\n\nThis stack allows developers to write both frontend and backend in JavaScript, sharing code and data structures. MERN applications typically have:\n- React components rendering the UI\n- Express routes handling API requests\n- MongoDB models representing data structures\n- Node.js managing server operations\n\nBenefits include a consistent language throughout the stack, JSON data format compatibility, strong community support, and excellent performance for real-time applications."
  },
  
  // React Questions
  {
    question: "What is React?",
    answer: "React is a JavaScript library developed by Facebook for building user interfaces. Key features include:\n\n1. Component-Based Architecture - UI is broken down into reusable, self-contained components\n2. Virtual DOM - Improves performance by minimizing direct DOM manipulation\n3. JSX - JavaScript XML syntax extension that allows HTML-like code in JavaScript\n4. Unidirectional Data Flow - Data flows down from parent to child components\n5. React Hooks - Functions that let you use state and lifecycle features in functional components\n\nReact focuses solely on the view layer of MVC (Model-View-Controller) and can be used with other libraries for routing (React Router), state management (Redux, Context API), and API calls (Axios, fetch). It's widely used for single-page applications but can also be rendered server-side with Next.js."
  },
  {
    question: "What are React Hooks?",
    answer: "React Hooks are functions introduced in React 16.8 that allow you to use state and other React features in functional components without writing classes. Common built-in hooks include:\n\n1. useState - Manages state in functional components\n   Example: const [count, setCount] = useState(0);\n\n2. useEffect - Handles side effects like data fetching, subscriptions, or DOM mutations\n   Example: useEffect(() => { document.title = `Count: ${count}`; }, [count]);\n\n3. useContext - Accesses context without nesting\n   Example: const theme = useContext(ThemeContext);\n\n4. useReducer - Manages complex state logic\n   Example: const [state, dispatch] = useReducer(reducer, initialState);\n\n5. useRef - Creates a mutable reference that persists across renders\n   Example: const inputRef = useRef(null);\n\nAdditional hooks include useCallback, useMemo, useLayoutEffect, and useImperativeHandle. You can also create custom hooks to reuse stateful logic between components."
  },
  {
    question: "What is state management in React?",
    answer: "State management in React refers to how data is handled, updated, and shared across components. Options include:\n\n1. Local Component State - Using useState hook or this.state in class components for component-specific data\n\n2. Lifting State Up - Moving state to common ancestor components and passing it down as props\n\n3. Context API - React's built-in solution for providing data across the component tree without prop drilling\n   - createContext creates a context object\n   - Provider component passes value down\n   - useContext hook or Consumer component reads the value\n\n4. Redux - External state management library following a single store pattern\n   - Actions describe state changes\n   - Reducers define how actions transform state\n   - Store holds the application state\n   - connect or useSelector/useDispatch hooks connect components\n\n5. Other Libraries:\n   - MobX - Reactive state management with observable patterns\n   - Zustand - Simplified state management with hooks\n   - Recoil - Facebook's experimental state management library\n   - Jotai/XState - Atomic approach to state management\n\nThe choice depends on application size, complexity, and team preferences."
  },
  
  // JavaScript Questions
  {
    question: "What are JavaScript promises?",
    answer: "Promises in JavaScript are objects that represent the eventual completion or failure of an asynchronous operation and its resulting value. They help manage asynchronous code more cleanly than callbacks.\n\nA Promise has three states:\n1. Pending: Initial state, neither fulfilled nor rejected\n2. Fulfilled: Operation completed successfully\n3. Rejected: Operation failed\n\nPromise syntax:\n```javascript\nconst myPromise = new Promise((resolve, reject) => {\n  // Asynchronous operation\n  if (/* operation successful */) {\n    resolve(result);\n  } else {\n    reject(error);\n  }\n});\n\nmyPromise\n  .then(result => {\n    // Handle success\n  })\n  .catch(error => {\n    // Handle error\n  })\n  .finally(() => {\n    // Executes regardless of outcome\n  });\n```\n\nPromises can be chained (.then().then()) and combined with Promise.all(), Promise.race(), Promise.any(), or Promise.allSettled() for handling multiple asynchronous operations."
  },
  {
    question: "What is async/await in JavaScript?",
    answer: "Async/await is a JavaScript syntax for working with asynchronous code that makes it look and behave more like synchronous code. It builds on promises and provides a more readable way to handle asynchronous operations.\n\nKey aspects:\n\n1. async function - Declares an asynchronous function that automatically returns a Promise\n   ```javascript\n   async function getData() {\n     // function body\n   }\n   ```\n\n2. await operator - Pauses execution until the Promise resolves\n   ```javascript\n   async function getData() {\n     try {\n       const response = await fetch('https://api.example.com/data');\n       const data = await response.json();\n       return data;\n     } catch (error) {\n       console.error('Error:', error);\n     }\n   }\n   ```\n\nBenefits:\n- More readable, sequential code style\n- Better error handling with try/catch\n- Easier debugging\n\nAsync/await can be used with Promise.all() for concurrent operations:\n```javascript\nasync function getMultipleData() {\n  const [users, posts] = await Promise.all([\n    fetch('/users').then(r => r.json()),\n    fetch('/posts').then(r => r.json())\n  ]);\n}\n```"
  },
  {
    question: "What are JavaScript closures?",
    answer: "A closure in JavaScript is a function that has access to its own scope, the outer function's variables, and global variables, even after the outer function has finished executing.\n\nClosures are created when a function is defined within another function, forming a lexical environment that consists of the local variables available at the time of creation.\n\nExample:\n```javascript\nfunction createCounter() {\n  let count = 0;  // Private variable\n  \n  return function() {\n    count += 1;    // Access to the outer function's scope\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\n```\n\nPractical uses of closures:\n1. Data encapsulation and private variables\n2. Factory functions and function factories\n3. Maintaining state in callbacks\n4. Implementing module patterns\n5. Creating function currying\n\nClosures are a fundamental JavaScript concept that enables powerful programming patterns but can lead to memory issues if not handled carefully."
  },
  {
    question: "What is the difference between var, let, and const in JavaScript?",
    answer: "JavaScript has three variable declaration keywords with important differences:\n\nvar:\n- Function-scoped or globally-scoped, not block-scoped\n- Can be redeclared and updated\n- Hoisted to the top of its scope and initialized with undefined\n- Creates properties on the window object when declared globally\n\nlet:\n- Block-scoped (available only within the block it's defined)\n- Can be updated but not redeclared in the same scope\n- Hoisted but not initialized (creates a 'temporal dead zone')\n- Doesn't create properties on the window object\n\nconst:\n- Block-scoped like let\n- Cannot be updated or redeclared\n- Must be initialized at declaration\n- For objects and arrays, the reference is constant but properties can be modified\n\nBest practices:\n- Use const by default\n- Use let when you need to reassign variables\n- Avoid var in modern JavaScript code\n- Remember that const doesn't make objects immutable (use Object.freeze() for that)"
  },
  {
    question: "What is the DOM in web development?",
    answer: "The Document Object Model (DOM) is a programming interface for web documents. It represents the page as a structured tree of nodes and objects, allowing programs to:\n\n1. Access document structure, style, and content\n2. Modify document structure, style, and content\n3. Add event handling to document elements\n\nThe DOM tree structure consists of various node types:\n- Document node (root)\n- Element nodes (HTML elements)\n- Text nodes (text content)\n- Attribute nodes (element attributes)\n\nJavaScript can interact with the DOM through built-in methods like:\n- document.getElementById()\n- document.querySelector() and document.querySelectorAll()\n- element.appendChild() and element.removeChild()\n- element.setAttribute() and element.getAttribute()\n- element.innerHTML, element.textContent, and element.innerText\n- element.classList.add(), element.classList.remove(), etc.\n\nDOM manipulation can be performance-intensive, which is why libraries like React use a Virtual DOM for performance optimization. The DOM is also the foundation for advanced interactions like form handling, drag-and-drop, and animations."
  }
];

// Mock education-focused responses
const mockResponses = {
  greeting: [
    "Hello! I'm your learning assistant. How can I help with your studies today?",
    "Welcome! What would you like to learn about today?",
    "Hi there! What subject are you studying right now?"
  ],
  default: [
    "That's an interesting question. While I don't have all the information, I can suggest exploring resources like textbooks, academic journals, or educational websites on this topic.",
    "Great question! This topic has many aspects to consider. I'd recommend breaking it down into smaller parts to study effectively.",
    "I'd need more information to provide a complete answer. Consider researching this topic further using your course materials or reliable online resources."
  ],
  programming: [
    "When learning programming, practice is key. Try solving small problems regularly and gradually increase the difficulty.",
    "Understanding data structures and algorithms is fundamental to becoming a good programmer. Make sure to master the basics first.",
    "For web development, I recommend learning HTML, CSS, and JavaScript as your foundation, then exploring frameworks based on your interests."
  ],
  math: [
    "Mathematics requires consistent practice. Try working through problems step by step and verify your answers.",
    "For complex math topics, visualizing the concepts can help. Look for graphical representations or create your own diagrams.",
    "When studying mathematics, understanding the underlying principles is more important than memorizing formulas."
  ],
  science: [
    "Scientific concepts are best learned through both theory and practical experiments. Try to find demonstrations of the principles you're studying.",
    "Creating concept maps can help connect different scientific ideas and show how they relate to each other.",
    "When studying science, always question assumptions and look for evidence that supports or contradicts theories."
  ],
  learning: [
    "Active recall (testing yourself) is one of the most effective study techniques. Try explaining concepts in your own words without looking at notes.",
    "Spaced repetition helps with long-term retention. Instead of cramming, spread your study sessions over time.",
    "The Pomodoro technique (25 minutes of focused work followed by a 5-minute break) can help maintain concentration during study sessions."
  ]
};

// Function to find the best matching question
const findBestMatch = (userQuestion) => {
  userQuestion = userQuestion.toLowerCase();
  
  // First try to find an exact match or close variant
  for (const qa of specificQuestionsAnswers) {
    const questionLower = qa.question.toLowerCase();
    
    // Check for exact match or if user question contains the specific question
    if (questionLower === userQuestion || 
        userQuestion.includes(questionLower) || 
        questionLower.includes(userQuestion)) {
      return qa.answer;
    }
  }
  
  // Try to match keywords if no direct match found
  const keywordMatches = specificQuestionsAnswers.map(qa => {
    const questionWords = qa.question.toLowerCase().split(/\W+/).filter(w => w.length > 3);
    const userWords = userQuestion.split(/\W+/).filter(w => w.length > 3);
    
    // Count matching significant words
    const matchCount = questionWords.filter(word => userWords.includes(word)).length;
    const matchScore = matchCount / questionWords.length;
    
    return { answer: qa.answer, score: matchScore };
  });
  
  // Find best match above threshold
  const bestMatch = keywordMatches.sort((a, b) => b.score - a.score)[0];
  if (bestMatch && bestMatch.score > 0.3) {
    return bestMatch.answer;
  }
  
  // Fallback to topic-based responses
  return getMockResponse(userQuestion);
};

// Function to get a mock response based on the question
const getMockResponse = (question) => {
  question = question.toLowerCase();
  
  // Return a greeting for hello/hi messages
  if (/^(hello|hi|hey|greetings)/i.test(question)) {
    return getRandomResponse('greeting');
  }
  
  // Check for topic-specific responses
  if (/programming|coding|javascript|python|java|html|css|react/i.test(question)) {
    return getRandomResponse('programming');
  }
  
  if (/math|mathematics|algebra|calculus|equation|geometry/i.test(question)) {
    return getRandomResponse('math');
  }
  
  if (/science|biology|chemistry|physics|scientific/i.test(question)) {
    return getRandomResponse('science');
  }
  
  if (/learning|study|memorize|remember|focus|concentration/i.test(question)) {
    return getRandomResponse('learning');
  }
  
  // Default response if no specific topic is detected
  return getRandomResponse('default');
};

// Get a random response from a category
const getRandomResponse = (category) => {
  const responses = mockResponses[category] || mockResponses.default;
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

// Simulate API delay
const simulateDelay = (min = 500, max = 2000) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

const Chatbot = () => {
  const [prompt, setPrompt] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Add a welcome message when the component mounts
    setConversation([
      { role: 'assistant', content: "Hello! I'm your learning assistant. Ask me about programming concepts, math problems, study techniques, or science topics!" }
    ]);
  }, []);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    
    // Add user message to conversation
    const updatedConversation = [
      ...conversation,
      { role: 'user', content: prompt }
    ];
    setConversation(updatedConversation);
    
    // Clear input and show loading
    setPrompt('');
    setLoading(true);

    try {
      // Simulate API call delay
      await simulateDelay();
      
      // Get response using best match function
      const response = findBestMatch(prompt);
      
      // Add assistant response to conversation
      setConversation([
        ...updatedConversation,
        { role: 'assistant', content: response }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setConversation([
        ...updatedConversation,
        { role: 'assistant', content: "I'm having trouble understanding right now. Could you try asking in a different way?" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <h2>Learning Assistant</h2>
      
      <div className="messages-container">
        {conversation.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
        
        {loading && (
          <div className="message assistant">
            <div className="message-content loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="chat-input">
        <textarea
          rows={3}
          placeholder="Ask about programming, math, science, or study tips..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading || !prompt.trim()}>
          Send
        </button>
      </div>

      <style jsx>{`
        .chatbot-container {
          max-width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 15px;
          background: #ffffff;
          border-radius: 12px;
        }
        
        h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #6ac1c5;
        }
        
        .messages-container {
          flex-grow: 1;
          overflow-y: auto;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .message {
          max-width: 80%;
          padding: 10px 15px;
          border-radius: 12px;
          margin-bottom: 10px;
          line-height: 1.5;
        }
        
        .user {
          align-self: flex-end;
          background-color: #6ac1c5;
          color: white;
          border-bottom-right-radius: 0;
        }
        
        .assistant {
          align-self: flex-start;
          background-color: #f5f5f5;
          color: #333;
          border-bottom-left-radius: 0;
        }
        
        .chat-input {
          display: flex;
          gap: 10px;
          margin-top: auto;
          border-top: 1px solid #eee;
          padding-top: 15px;
        }
        
        textarea {
          flex-grow: 1;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          resize: none;
          font-family: inherit;
          font-size: 14px;
        }
        
        button {
          padding: 0 20px;
          background: linear-gradient(135deg, #6ac1c5, #bda5ff);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        button:hover {
          opacity: 0.9;
        }
        
        button:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }
        
        .loading .typing-indicator {
          display: flex;
          padding: 5px 0;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          background-color: #666;
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
