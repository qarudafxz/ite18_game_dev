import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Pages/Menu';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Leaderboard from './Pages/Leaderboard';
import BoardView from './components/BoardView';
import './main.scss'
import './styles.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/game" element={<BoardView/>}/>
        <Route path="/leaderboards" element={<Leaderboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
