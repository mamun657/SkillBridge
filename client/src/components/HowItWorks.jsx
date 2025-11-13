import { useEffect, useRef, useState } from 'react';
import '../dashboard-bottom.css';

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section className="how-it-works" ref={ref}>
      <h2>How It Works</h2>
      <p className="subtitle">Get started with our simple 3-step process</p>
      <div className="steps">
        <div className={`step ${isVisible ? 'animate' : ''}`}>
          <div className="step-icon">
            <span className="step-number">1</span>
          </div>
          <h3 className="step-title">Create Your Profile</h3>
          <p className="step-desc">Upload your resume or fill in your skills and experience to get personalized recommendations.</p>
        </div>
        <div className={`step ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '200ms' }}>
          <div className="step-icon">
            <span className="step-number">2</span>
          </div>
          <h3 className="step-title">Explore Opportunities</h3>
          <p className="step-desc">Browse AI-matched jobs and learning resources tailored to your career goals.</p>
        </div>
        <div className={`step ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '400ms' }}>
          <div className="step-icon">
            <span className="step-number">3</span>
          </div>
          <h3 className="step-title">Track Your Progress</h3>
          <p className="step-desc">Monitor your skill development and apply to jobs with confidence.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
