import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import Recommended from '../../components/Recommended/Recommended';
import Trending from '../../components/Trending/Trending';
import homeData from '../../json/data.json';
import DetailsPage from '../../components/DetailsPage/DetailsPage';
import Testimonials from '../../components/Testimonials/Testimonials';
import StatsSection from '../../StatsSection/StatsSection';
import BusinessSection from '../../components/BusinessSection/BusinessSection';
import AnimatedCard from '../../components/AnimatedCard/AnimatedCard';
// import ServicesSection from '../../components/ServicesSection/ServicesSection';

const Home = () => {
  const heroData = homeData["1"].hero;
  const recommendedData = homeData["1"].recommended;
  const trendingData = homeData["1"].trending;
  const detailsData = homeData["1"].detailsPage;
  const testimonialsData = homeData["1"].reviews; // ✅ correct reference

  return (
    <div>
      <HeroSection heroData={heroData} />
      <Recommended recommendedData={recommendedData} />
      <Trending data={trendingData} />
      <Testimonials data={testimonialsData} /> {/* ✅ added Testimonials */}
      {/* <ServicesSection/> */}
      <DetailsPage detailsData={detailsData} />
      <StatsSection/>
      <BusinessSection/>
      {/* <AnimatedCard/> */}
    </div>
  );
};

export default Home;
