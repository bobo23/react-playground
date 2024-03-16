import Layout from '../Layout';
import images from '../../data/images';
import './Gallery.css';

export default function Gallery() {
  return(
    <Layout>
      <div className="gallery">
        <h2>Gallery</h2>
        <div className="gallery-container">
          <div className="gallery-thumbnail-container">
            {images.map((image, index) => (
              <div key={index} className="gallery-thumbnail">
                <img src={image.thumb} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
