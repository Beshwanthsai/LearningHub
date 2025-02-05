import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './authenticationpages/login'
import Landing from './Landing'
function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
          </Routes>
      </Router>
  );
}

export default App
