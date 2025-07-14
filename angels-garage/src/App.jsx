import './App.css'
import CarListing from './components/CarListing'
import Secondbar from './components/Secondbar'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Contact  from './components/Contact'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/carlisting" element={<CarListing />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App

// This is the main entry point of the application.