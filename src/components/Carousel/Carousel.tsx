import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  SyntheticEvent,
} from 'react';
import { CarouselProps } from './types';
import './Carousel.css';

const VISIBLE_SLIDES_DESKTOP = 4;

const Carousel = ({ data }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback(
    (direction: 'previous' | 'next') => {
      let scrollIndex = currentIndex;

      if (direction === 'previous' && currentIndex > 0) {
        scrollIndex = currentIndex - 1;
      } else if (
        direction === 'next' &&
        currentIndex < data.length - VISIBLE_SLIDES_DESKTOP
      ) {
        scrollIndex = currentIndex + 1;
      }

      if (containerRef.current) {
        containerRef.current.children[scrollIndex].scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
        });
      }
    },
    [currentIndex, data]
  );

  const navigateToSlide = useCallback(
    (e: SyntheticEvent) => {
      const element = e.target as HTMLElement;
      const index = element.dataset.index
        ? parseInt(element.dataset.index, 10)
        : 0;

      if (containerRef.current) {
        containerRef.current.children[index].scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
        });
      }
    },
    [containerRef]
  );

  const navigatePrevious = useCallback(() => navigate('previous'), [navigate]);
  const navigateNext = useCallback(() => navigate('next'), [navigate]);

  useEffect(() => {
    const container = containerRef.current;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        const { intersectionRect, target, isIntersecting } = entry;

        if (intersectionRect.left === 0) {
          const element = target as HTMLElement;

          if (element.dataset.index) {
            const elementIndex = parseInt(element.dataset.index, 10);
            const index = isIntersecting ? elementIndex : elementIndex + 1;

            setCurrentIndex(index);
          }
        }
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    if (container) {
      Array.from(container.children).forEach((node) => {
        observer.observe(node);
      });
    }

    return () => {
      if (container) {
        Array.from(container.children).forEach((node) => {
          observer.unobserve(node);
        });
      }
    };
  }, [data]);

  return (
    <section
      className="carousel"
      ref={carouselRef}
      aria-label="product carousel"
    >
      <p className="sr">
        Carousel showing the latest Volvo Recharge cars. Use the previous and
        next buttons to navigate through the slides or tap the indicator dots to
        go to a specific slide.
      </p>
      <div
        className="carousel__container"
        ref={containerRef}
        data-testid="container"
      >
        {data.map(({ bodyType, id, imageUrl, modelName, modelType }, index) => (
          <div
            className="carousel__slide"
            key={id}
            data-index={index}
            role="group"
            aria-label={`slide ${index + 1} of ${data.length}`}
          >
            <article className="carousel__slide-content">
              <div className="carousel__slide-body-type">{bodyType}</div>
              <div className="carousel__slide-model-name">{modelName}</div>
              <div className="carousel__slide-model-type">{modelType}</div>
              <img
                src={imageUrl}
                alt={`${modelName} ${modelType}`}
                className="carousel__slide-image"
              />
              <div className="carousel__slide-links">
                <a href={`/learn/${id}`} className="carousel__slide-link">
                  Learn
                </a>
                <a href={`/shop/${id}`} className="carousel__slide-link">
                  Shop
                </a>
              </div>
            </article>
          </div>
        ))}
      </div>
      <div className="carousel__indicators">
        {data.map(({ id }, index) => (
          <div
            key={`nav${id}`}
            className={`carousel__indicator-item${
              index === currentIndex
                ? ' carousel__indicator-item__selected'
                : ''
            }`}
            data-index={index}
            onClick={navigateToSlide}
            {...(index === currentIndex ? { 'aria-current': true } : {})}
          >
            <span className="sr">go to slide {index + 1}</span>
          </div>
        ))}
      </div>
      <div className="carousel__navigation">
        <div className="carousel__navigation-item">
          <button
            className="carousel__navigation-button carousel__navigation-button__previous"
            onClick={navigatePrevious}
            data-testid="button-previous"
          >
            <span className="sr">Previous Slide</span>
          </button>
        </div>
        <div className="carousel__navigation-item">
          <button
            className="carousel__navigation-button carousel__navigation-button__next"
            onClick={navigateNext}
            data-testid="button-next"
          >
            <span className="sr">Next Slide</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
