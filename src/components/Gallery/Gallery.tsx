import Layout from '../Layout';
import images from '../../data/images';
import './Gallery.css';

export default function Gallery() {
  return(
    <Layout>
      <div className="gallery">
        <h2>Gallery</h2>
        <div className="gallery-images">
          {images.map((image, index) => (
            <div key={index} className="gallery-image">
              <img src={image.image} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
