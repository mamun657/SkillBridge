import HowItWorks from './HowItWorks';
import PowerfulFeatures from './PowerfulFeatures';
import TestimonialCarousel from './TestimonialCarousel';
import Footer from './Footer';
import '../dashboard-bottom.css';

const DashboardBottom = () => {
  return (
    <div className="dashboard-bottom">
      <HowItWorks />
      <PowerfulFeatures />
      <TestimonialCarousel />
      <Footer />
    </div>
  );
};

export default DashboardBottom;
