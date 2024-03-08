import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TicTacToe from './components/TicTacToe';
import ShoppingList from './components/ShoppingList';
import Memory from './components/Memory';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/memory" element={<Memory />} />
      </Routes>
    </Router>
  )
}