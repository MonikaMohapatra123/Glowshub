
import React, { useState } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import Recommended from '../../components/Recommended/Recommended';
import Trending from '../../components/Trending/Trending';
import homeData from '../../json/data.json';
import DetailsPage from '../../components/DetailsPage/DetailsPage';
import Testimonials from '../../components/Testimonials/Testimonials';
import StatsSection from '../../components/StatsSection/StatsSection';
import BusinessSection from '../../components/BusinessSection/BusinessSection';
import BookingModal from '../../components/BookingModal/BookingModal';


const Home = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false); // ✅ modal state

  const heroData = homeData["1"].hero;
  const recommendedData = homeData["1"].recommended;
  const trendingData = homeData["1"].trending;
  const detailsData = homeData["1"].detailsPage;
  const testimonialsData = homeData["1"].reviews;

  return (
    <div>
      <HeroSection heroData={heroData} />
      <Recommended recommendedData={recommendedData} />
      <Trending data={trendingData} />
      <Testimonials data={testimonialsData} />
      <DetailsPage detailsData={detailsData} />
      <StatsSection/>
      <BusinessSection/>

      {/* ✅ Book Now button anywhere on homepage */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button 
          onClick={() => setIsBookingOpen(true)} 
          style={{ padding: "12px 20px", background: "#e91e63", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Book Now
        </button>
      </div>

      {/* ✅ Booking modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
     
    </div>
  );
};

export default Home;
