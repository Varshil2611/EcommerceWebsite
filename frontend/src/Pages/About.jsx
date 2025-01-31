import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">About Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Brand Story Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-lg text-gray-600 mb-6">
            Welcome to [Your Brand Name], where fashion meets comfort. We are passionate about providing high-quality,
            stylish clothing that empowers individuals to feel confident, comfortable, and ready to conquer the day.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Founded in [Year], our brand began with a simple idea – to create versatile, timeless pieces for people who
            appreciate quality, sustainability, and innovation. What started as a small collection of [clothing types]
            quickly grew into a trusted name in the fashion world.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            At [Your Brand Name], we focus on designs that reflect your lifestyle and personality. From casual wear to
            evening essentials, our clothing helps you express yourself, all while prioritizing comfort and durability.
          </p>
        </div>

        {/* Mission and Values Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our mission is to inspire and empower individuals through fashion that blends effortlessly with every lifestyle.
            We believe in creating clothing that doesn’t just look good but also feels great, providing a wardrobe that
            lasts season after season.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            We are committed to producing high-quality garments that are as kind to the planet as they are to your skin.
            Our clothing is designed with sustainability, comfort, and style in mind, allowing you to look good while
            making a positive impact on the environment.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Key Points */}
          <div className="w-64 text-center bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainable Fashion</h3>
            <p className="text-gray-600">
              Our pieces are crafted with sustainability at the forefront. We source eco-friendly materials and work with
              ethical manufacturers to create fashion you can feel good about.
            </p>
          </div>
          <div className="w-64 text-center bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Timeless Styles</h3>
            <p className="text-gray-600">
              Our collections feature versatile, timeless designs that never go out of style. Perfect for layering and
              mixing and matching.
            </p>
          </div>
          <div className="w-64 text-center bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Materials</h3>
            <p className="text-gray-600">
              We use only the finest fabrics to ensure your clothes feel as good as they look. Quality and comfort are
              always top priorities.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Values */}
          <div className="w-64 text-center bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Empowerment</h3>
            <p className="text-gray-600">
              We believe in empowering individuals by providing clothing that boosts confidence and promotes self-expression.
            </p>
          </div>
          <div className="w-64 text-center bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Creativity</h3>
            <p className="text-gray-600">
              Creativity is at the heart of everything we do. We’re constantly innovating and pushing boundaries to deliver
              fresh, exciting designs.
            </p>
          </div>
          <div className="w-64 text-center bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainability</h3>
            <p className="text-gray-600">
              Sustainability guides our entire process, from sourcing eco-friendly materials to minimizing waste in production.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
