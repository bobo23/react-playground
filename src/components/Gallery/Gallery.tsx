import { useState } from 'react';
import Layout from '../Layout';
import images from '../../data/images';
import './Gallery.css';

export default function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const onThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  }

  return(
    <Layout>
      <div className="gallery">
        <h2>Gallery</h2>
        <div className="gallery-container">
        <div className="gallery-main-image-container">
          <div className="gallery-main-image">
            <img src={images[currentImageIndex].image} />
          </div>
        </div>
          <div className="gallery-thumbnail-container">
            {images.map((image, index) => (
              <div key={index} className="gallery-thumbnail" onClick={() => onThumbnailClick(index)}>
                <img src={image.thumb} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
