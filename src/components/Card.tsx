import { NavLink } from 'react-router-dom';
import '../Card.css';

interface CardProps {
  title: string;
  text: string;
  imageUrl: string;
  linkTo: string;
}

const Card = ({ title, text, imageUrl, linkTo }: CardProps) => {
  return (
    <div className="card">
      <NavLink to={linkTo}>
        <div className="card-image">
          <img src={imageUrl} alt={title} />
        </div>
        <div className="card-content">
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Card;
