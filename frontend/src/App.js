import React from 'react';
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import Home from './components/Home'
import Log from './components/Log'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Navigate to="/home"/>}/>
          <Route path='/home' exact element={<Home/>}/>
          <Route path='/log' exact element={<Log/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
