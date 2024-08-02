import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Routes,Route } from 'react-router-dom'
import Instructorview from './components/Instructorview'
import Addcourse from './components/Addcourse'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/instructorview' element={<Instructorview/>}></Route> 
        <Route path='/iaddcourse' element={<Addcourse/>}></Route> 
      </Routes>
    </>
  )
}

export default App
