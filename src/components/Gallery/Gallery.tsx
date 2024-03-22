import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Layout from '../Layout';
import images from '../../data/images';
import './Gallery.css';

export default function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const changeImage = (newIndex: number) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setIsVisible(true);
    }, 500);
  };

  const getImageOrientation = (event: any) => {
    const img = event.target;
    
    if (img.naturalWidth > img.naturalHeight) {
      img.classList.add('landscape');
    } else {
      img.classList.add('portrait');
    }
  }

  return(
    <Layout>
      <div className="gallery">
        <h2>Gallery</h2>
        <div className="gallery-container">
        <div className="gallery-main-image-container">
          <div className="gallery-main-image">
            <img key={`image_` + currentImageIndex}src={images[currentImageIndex].image} onLoad={getImageOrientation} className={isVisible ? 'image-visible' : ''} />
            <FontAwesomeIcon icon={faChevronLeft} className="gallery-main-image-nav-left" onClick={() => setCurrentImageIndex(currentImageIndex - 1)} />
            <FontAwesomeIcon icon={faChevronRight} className="gallery-main-image-nav-right" onClick={() => setCurrentImageIndex(currentImageIndex + 1)} />
          </div>
        </div>
          <div className="gallery-thumbnail-container">
            {images.map((image, index) => (
              <div key={index} className="gallery-thumbnail" onClick={() => changeImage(index)}>
                <img src={image.thumb} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
