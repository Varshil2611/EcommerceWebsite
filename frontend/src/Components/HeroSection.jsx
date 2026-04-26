import { assets } from '../assets/assets';

const HeroSection = () => {
  return (
    <section className="bg-white text-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse sm:flex-row items-center">
          
          {/* Text Section with fade-right animation */}
          <div
            className="sm:w-1/2 text-center sm:text-left"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Latest Arrivals
            </h1>
            <p className="text-lg sm:text-xl mb-6">
              Discover the best products for your needs. Quality, style, and comfort—all in one place.
            </p>
            <a
              href="/collection"
              className="inline-block bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Start Shopping
            </a>
          </div>

          {/* Image Section with zoom-in animation */}
          <div
            className="sm:w-1/2 mt-12 sm:mt-0"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
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
