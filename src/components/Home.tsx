import Layout from './Layout';
import Card from './Card';
import tictactoe from '../assets/TicTacToe.png';
import memory from '../assets/Memory.png';
import shoppingList from '../assets/Shopping-List.png';

export default function Home() {
  return (
     <Layout>
      <div className="home">
        <Card 
          title="Tic Tac Toe" 
          text="Just the classig game." 
          imageUrl={tictactoe} 
          linkTo="/tictactoe" 
        />
        <Card 
          title="Memory" 
          text="Find NFL players." 
          imageUrl={memory} 
          linkTo="/memory" 
        />
        <Card 
          title="Shopping List" 
          text="Also a ToDo-List." 
          imageUrl={shoppingList} 
          linkTo="/shopping-list" 
        />
      </div>
    </Layout>
  );
}
