import TicTacToe from './components/TicTacToe';
import ShoppingList from './components/ShoppingList';
import Memory from './components/Memory';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <div className="feature">
        <Memory />
      </div>
      <div className="feature">
        <TicTacToe />
      </div>
      <div className="feature">
        <ShoppingList />
      </div>
    </div>
  )
}