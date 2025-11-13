import { useEffect, useRef, useState } from 'react';
import '../dashboard-bottom.css';

const testimonials = [
  {
    quote: "This platform transformed my career! The AI recommendations were spot on.",
    author: "Sarah Johnson",
    role: "Software Engineer",
    avatar: "/avatars/sarah.jpg"
  },
  {
    quote: "I landed my dream job thanks to the personalized learning paths.",
    author: "Mike Chen",
    role: "Data Scientist",
    avatar: "/avatars/mike.jpg"
  },
  {
    quote: "The skill tracking feature kept me motivated throughout my journey.",
    author: "Emily Davis",
    role: "UX Designer",
    avatar: "/avatars/emily.jpg"
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef();
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="testimonial-carousel" ref={ref} onKeyDown={handleKeyDown} tabIndex={0} aria-roledescription="carousel">
      <div className={`testimonial-card ${isVisible ? 'animate' : ''}`}>
        <div className="stars">
          {'⭐'.repeat(5)}
        </div>
        <blockquote className="quote" aria-live="polite">
          "{currentTestimonial.quote}"
        </blockquote>
        <div className="author">
          <img src={currentTestimonial.avatar} alt={`${currentTestimonial.author} avatar`} className="avatar" />
          <div className="author-info">
            <h4>{currentTestimonial.author}</h4>
            <p>{currentTestimonial.role}</p>
          </div>
        </div>
      </div>
      <nav className="nav" aria-label="Testimonial navigation">
        <button className="arrow" onClick={handlePrev} aria-label="Previous testimonial">
          ‹
        </button>
        <div className="nav-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        <button className="arrow" onClick={handleNext} aria-label="Next testimonial">
          ›
        </button>
      </nav>
    </section>
  );
};

export default TestimonialCarousel;
