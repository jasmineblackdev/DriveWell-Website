import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import PricingPage from './pages/PricingPage'
import ForFleets from './pages/ForFleets'
import ForDrivers from './pages/ForDrivers'
import ForTrainers from './pages/ForTrainers'
import './index.css'

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/"         element={<Home />}        />
        <Route path="/pricing"  element={<PricingPage />} />
        <Route path="/fleets"   element={<ForFleets />}   />
        <Route path="/drivers"  element={<ForDrivers />}  />
        <Route path="/trainers" element={<ForTrainers />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
