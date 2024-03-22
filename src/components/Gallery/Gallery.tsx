import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Layout from '../Layout';
import images from '../../data/images';
import './Gallery.css';

export default function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => {
      scrollToThumbnail(currentImageIndex);
    }, 0);
  }, [currentImageIndex]);

  const imagesWithOrientation = images.map(image => {
    const img = new Image();

    img.src = image.thumb;

    const orientation = img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait';

    return { ...image, orientation };
  });

  const changeImage = (newIndex: number) => {
    let finalIndex = newIndex;

    if (newIndex < 0) {
      finalIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      finalIndex = 0;
    }

    setCurrentImageIndex(finalIndex);
    setIsVisible(true);
    scrollToThumbnail(finalIndex);
  };

  const scrollToThumbnail = (index: number) => {
    const thumbnail = thumbnailContainerRef.current?.children[index] as HTMLElement;
    thumbnail?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const getImageOrientation = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    
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
            <FontAwesomeIcon icon={faChevronLeft} className="gallery-main-image-nav-left" onClick={() => changeImage(currentImageIndex - 1)} />
            <FontAwesomeIcon icon={faChevronRight} className="gallery-main-image-nav-right" onClick={() => changeImage(currentImageIndex + 1)} />
          </div>
        </div>
          <div className="gallery-thumbnail-container" ref={thumbnailContainerRef}>
            {imagesWithOrientation.map((image, index) => (
              <div key={index} className="gallery-thumbnail" onClick={() => changeImage(index)}>
                <img src={image.thumb} className={`${index === currentImageIndex ? 'active-thumb' : ''} ${image.orientation}`}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
