import React from 'react';
import {assets} from '../assets/assets'

const HeroSection = () => {
  return (
    <section className="bg-white text-black py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse sm:flex-row items-center">
          {/* Text Section */}
          <div className="sm:w-1/2 text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 ">
              Latest Arrivals
            </h1>
            <p className="text-lg sm:text-xl mb-6">
              Discover the best products for your needs. Quality, style, and comfort—all in one place.
            </p>
            <a href="/collection" className="inline-block bg-black text-white py-2 px-6 rounded-md ">
              Start Shopping
            </a>
          </div>

          {/* Image Section */}
          <div className="sm:w-1/2 mt-12 sm:mt-0">
            <img
              src={assets.about_img}
              alt="Store Image"
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
