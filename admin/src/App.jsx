import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useAuth } from './context/useAuth'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainLayout from './layout/main';
import ProtectedRoute from './routes/protectedRoute';
import Login from './pages/login'
import NotFound from './pages/not-found'
import HomePage from './pages/home-page';
import Voters from './pages/voters';
import Managers from './pages/managers';
import './App.css'

function App() {
  const { user }  = useAuth()
  const isAdmin = user && user.role === 'admin'
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/admin" element={<ProtectedRoute isAllowed={isAdmin}><MainLayout /></ProtectedRoute>}>\
            <Route index element={<HomePage />} />
            <Route path="sec" element={<HomePage/>} >
              <Route path='voters' element={<Voters />} />
              <Route path='managers' element={<Managers />} />
            </Route>
          </Route>
        </Routes>
    </Router>
  )


}

export default App
