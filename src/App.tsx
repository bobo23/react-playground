import TicTacToe from './components/TicTacToe';
import ShoppingList from './components/ShoppingList';

export default function App() {
  return (
    <div className="app">
      <div className="feature">
        <TicTacToe />
      </div>
      <div className="feature">
        <ShoppingList />
      </div>
    </div>
  )
}