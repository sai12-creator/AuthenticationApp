import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './contexts/Authcontext.jsx';
const App = () => {
  const { isAuthenticated } = useAuth()
  return <Router>
             <Routes>
              <Route  path='/' element ={!isAuthenticated ? <Register/> : <Navigate to='/dashboard'/>} />
              <Route  path='/login' element ={!isAuthenticated ? <Login/> : <Navigate to= '/dashboard'/>} />
              <Route  path='/dashboard' element ={isAuthenticated ? <Dashboard/> : <Login/>} />
             </Routes>
     </Router>
}

export default App