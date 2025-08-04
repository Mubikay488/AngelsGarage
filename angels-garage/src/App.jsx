import './App.css'
import CarListing from './components/CarListing'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Contact  from './components/Contact'
import SellForm from './components/SellForm'
import Home from './components/Home'
import AdminPage from './components/AdminPage'
import SignIn from './components/SignIn';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/buy" element={<CarListing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sell" element={<SellForm />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App

// This is the main entry point of the application.