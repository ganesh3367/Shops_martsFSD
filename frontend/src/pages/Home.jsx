import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoriesSection from '../components/home/CategoriesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const Home = () => (
  <div>
    <HeroSection />
    <FeaturedProducts />
    <CategoriesSection />
    <WhyChooseUs />
    <Testimonials />
    <Newsletter />
  </div>
);

export default Home;
