import React, { useState, useEffect } from 'react';

export const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div className="">
      <button className="" onClick={goToPreviousSlide}>
        &lt;
      </button>
      <div className="">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${
              index === currentSlide ? 'active' : 'hidden'
            } `}
          >
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="" onClick={goToNextSlide}>
        &gt;
      </button>
    </div>
  );
};




