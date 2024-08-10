import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Instructorview from './components/Instructorview';
import Addcourse from './components/Addcourse';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Studentview from './components/Studentview';
import Enrollview from './components/Enrollview';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/instructorview' element={<Instructorview />} />
        <Route path='/studentview' element={<Studentview />} />
        <Route path='/enrollview' element={<Enrollview />} />
        <Route path='/iaddcourse' element={<Addcourse />} />
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/signuppage' element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
