import React from 'react'
import HeroSection from '../Components/HeroSection'
import LatestCollection from '../Components/LatestCollection'
import BestsellerSection from '../Components/BestSellerSection'

const Home = () => {
  return (
    <div>
      <HeroSection/>  
      <LatestCollection/>
      <BestsellerSection/>
    </div>
  )
}

export default Home;
