import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import Home from './component/Home'
import Registro from './component/Registro'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Navigate to="/home"/>}/>
          <Route path='/home' exact element={<Home/>}/>
          <Route path='/registro' exact element={<Registro/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
