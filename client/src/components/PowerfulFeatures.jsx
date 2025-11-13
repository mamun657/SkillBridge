import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../dashboard-bottom.css';

const PowerfulFeatures = () => {
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
    <section className="powerful-features" ref={ref}>
      <h2>Powerful Features</h2>
      <p className="subtitle">Everything you need to advance your career</p>
      <div className="features-grid">
        <div className={`feature-card ${isVisible ? 'animate' : ''}`}>
          <div className="feature-icon">🤖</div>
          <h3 className="feature-title">AI Job Matching</h3>
          <p className="feature-desc">Get personalized job recommendations based on your skills and experience.</p>
          <Link to="/ai-lab" className="feature-cta">Learn More</Link>
        </div>
        <div className={`feature-card ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '200ms' }}>
          <div className="feature-icon">📚</div>
          <h3 className="feature-title">Learning Resources</h3>
          <p className="feature-desc">Access curated courses and tutorials to upskill in your desired field.</p>
          <Link to="/resources" className="feature-cta">Explore</Link>
        </div>
        <div className={`feature-card ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '400ms' }}>
          <div className="feature-icon">📊</div>
          <h3 className="feature-title">Progress Tracking</h3>
          <p className="feature-desc">Monitor your skill development and career milestones.</p>
          <Link to="/dashboard" className="feature-cta">View Dashboard</Link>
        </div>
      </div>
    </section>
  );
};

export default PowerfulFeatures;
