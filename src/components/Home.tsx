import Layout from './Layout';
import Card from './Card';
import tictactoe from '../assets/TicTacToe.png';

export default function Home() {
  return (
     <Layout>
      <div className="home">
        <Card 
          title="Tic Tac Toe" 
          text="Just the classig game." 
          imageUrl={tictactoe} 
          linkTo="/ziel-seite" 
        />
      </div>
    </Layout>
  );
}
