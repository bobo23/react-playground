import { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';
import Layout from '../Layout';
import images from '../../data/images';
import './Gallery.css';

interface Image {
  image: string;
  thumb: string;
  orientation: string;
}

const SCROLL_DELAY = 0;

export default function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [imagesWithOrientation, setImagesWithOrientation] = useState<Image[]>([]);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const [animationClass, setAnimationClass] = useState<string>('');

  const scrollToThumbnail = useCallback((index: number) => {
    const thumbnail = thumbnailContainerRef.current?.children[index] as HTMLElement;
    thumbnail?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToThumbnail(currentImageIndex);
    }, SCROLL_DELAY);

    return () => clearTimeout(timer);
  }, [currentImageIndex, scrollToThumbnail]);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const loadedImages = await Promise.all(
      images.map((image) =>
        new Promise<Image>((resolve) => {
          const img = new Image();

          img.src = image.thumb;
          img.onload = () => {
            const orientation = img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait';
            
            resolve({ ...image, orientation });
          };
        })
      )
    );

    setImagesWithOrientation(loadedImages);
  };

  const changeImage = useCallback((newIndex: number) => {
    setCurrentImageIndex(prevIndex => {
      if (newIndex === prevIndex) {
        return prevIndex;
      }

      let finalIndex = newIndex;

      if (newIndex < 0) {
        finalIndex = images.length - 1;
      } else if (newIndex >= images.length) {
        finalIndex = 0;
      }
      
      if (finalIndex > prevIndex) {
        setAnimationClass('slide-out-left');
      } else {
        setAnimationClass('slide-out-right');
      }

      setTimeout(() => {
          if (finalIndex > prevIndex) {
            setAnimationClass('slide-in-right');
          } else {
            setAnimationClass('slide-in-left');
          }
    
          scrollToThumbnail(finalIndex);
          console.log(prevIndex, finalIndex);
      }, 500);

      return finalIndex;
    });
  }, [scrollToThumbnail]);

  return(
    <Layout>
      <div className="gallery">
        <h2>Gallery</h2>
        <div className="gallery-container">
          <div className="gallery-main-image-container">
            <div className="gallery-main-image">
              {imagesWithOrientation.length > 0 ? (
                <img
                  key={`image_` + currentImageIndex}
                  src={imagesWithOrientation[currentImageIndex]?.image}
                  className={` ${imagesWithOrientation[currentImageIndex]?.orientation} image-slide ${animationClass}`}
                  loading="lazy"
                />
              ) : (
                <div>Loading...</div>
              )}
              <FontAwesomeIcon icon={faChevronLeft} className="gallery-main-image-nav-left" onClick={() => changeImage(currentImageIndex - 1)} />
              <FontAwesomeIcon icon={faChevronRight} className="gallery-main-image-nav-right" onClick={() => changeImage(currentImageIndex + 1)} />
            </div>
            <div className="bullets">
              {imagesWithOrientation.map((_, index) => (
                <FontAwesomeIcon
                  icon={index === currentImageIndex ? faCircle : faCircleRegular}               
                  key={index}
                  className={`bullet ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => changeImage(index)}
                />
              ))}
            </div>
          </div>
          <div className="gallery-thumbnail-container" ref={thumbnailContainerRef}>
            {imagesWithOrientation.map((image, index) => (
              <div key={index} className="gallery-thumbnail" onClick={() => changeImage(index)}>
                <img
                  src={image.thumb}
                  className={`${index === currentImageIndex ? 'active-thumb' : ''} ${image.orientation}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
