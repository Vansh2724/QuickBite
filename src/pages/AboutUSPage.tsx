import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import test1 from "../assets/images/download.jpeg";
import test2 from "../assets/images/download (1).jpeg";
import test3 from "../assets/images/Tax Recruitment Client Testimonial GSK.webp";
import test4 from "../assets/images/Testimonials-image01.png";
import food from "../assets/images/pexels-ella-olsson-572949-1640777.jpg";
import frmae2 from "../assets/images/delivery_3063822.png";
import frame1 from "../assets/images/computer_15909643.png";
import frame3 from "../assets/images/fast-food_737967.png";
import vansh from "../assets/images/vansh.jpg";
import chirag from "../assets/images/chirag.jpg";
// Initialize AOS for animations
AOS.init();

// Testimonial Data
const testimonials = [
  {
    name: "John Doe",
    image: test3,
    review:
      "The food was absolutely amazing! Delivered hot and fresh. I highly recommend this service!",
  },
  {
    name: "Jane Smith",
    image: test4,
    review:
      "Excellent customer service and delicious meals. This is my go-to food delivery app!",
  },
  {
    name: "Emily Johnson",
    image: test1,
    review:
      "A seamless experience from ordering to delivery. The food quality is top-notch!",
  },
  {
    name: "Mike Brown",
    image: test2,
    review:
      "Fast delivery and great variety of meals. Highly satisfied with the service.",
  },
];

// Testimonial Slider Component
const TestimonialSection: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animate only once when scrolling down
    });
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-center text-3xl font-semibold mb-8 text-green-700">
          What Our Customers Say
        </h2>
        <div className="mx-auto w-full max-w-3xl">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="px-4"
                data-aos="fade-up"
                data-aos-delay={`${index * 200}`} // Staggered delay for each testimonial
              >
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xl mx-auto transition transform hover:-translate-y-2 hover:shadow-2xl">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="mx-auto w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <p className="text-lg italic text-gray-700 mb-4">
                    "{testimonial.review}"
                  </p>
                  <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

// "What Sets Us Apart" Component
const WhatSetsUsApart: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="py-12 bg-white mt-12 -mb-12">
      <div className="container mx-auto text-center">
        <h2 className="text-center text-3xl font-semibold mb-8 text-green-700">
          What Sets Us Apart
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="p-8 bg-gray-100 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-2 hover:shadow-xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img
              src={frame3}
              alt="Curated Selection"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-green-700">
              Curated Selection
            </h3>
            <p className="text-gray-600">
              We partner only with the best restaurants.
            </p>
          </div>
          <div
            className="p-8 bg-gray-100 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-2 hover:shadow-xl"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <img
              src={frmae2}
              alt="Lightning-Fast Delivery"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-green-700">
              Lightning-Fast Delivery
            </h3>
            <p className="text-gray-600">Your food arrives hot and fresh.</p>
          </div>
          <div
            className="p-8 bg-gray-100 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-2 hover:shadow-xl"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <img
              src={frame1}
              alt="User-Friendly Platform"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-green-700">
              User-Friendly Platform
            </h3>
            <p className="text-gray-600">
              Ordering your favorite meals is a breeze.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main About Us Component
const AboutUSPage: React.FC = () => {
  return (
    <div className="about-us bg-gray-20 text-gray-900 py-12 rounded-xl -mt-10">
      <div className="container mx-auto px-6">
        {/* About Us Section */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image Section */}
          <div
            className="lg:w-1/2"
            data-aos="fade-right"
            data-aos-delay="300"
            data-aos-duration="1000"
          >
            <img
              src={food}
              alt="Delicious food"
              className="rounded-lg shadow-xl"
            />
          </div>
          {/* Text Section */}
          <div
            className="lg:w-1/2 lg:ml-12 mt-6"
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-duration="1000"
          >
            <h2 className="text-left text-3xl font-semibold mb-8 text-green-700">
              About Us
            </h2>
            <p className="text-lg mb-6 leading-relaxed">
              Welcome to <span className="font-bold">QuickBite.com</span>, your
              one-stop destination for the best gourmet meals delivered right to
              your doorstep. We are passionate about serving the freshest and
              most delicious dishes that make you crave for more. Our chefs are
              culinary experts who create magic with every dish.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Ready to taste the best? Start your order now and let us take care
              of the rest!
            </p>
          </div>
        </div>

        <WhatSetsUsApart />

        {/* Testimonial Section */}
        <TestimonialSection />

       
        <div className="team-section mt-20 mb-16">
  <h3
    className="text-center text-3xl font-semibold mb-8 text-green-700"
    data-aos="fade-up"
    data-aos-delay="300"
    data-aos-duration="1000"
  >
    Meet Our Team
  </h3>

  <div className="flex justify-center">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      {[
        {
          name: "Vansh Patel",
          role: "Developer",
          img: vansh
        },
        {
          name: "Chirag Senma",
          role: "Developer",
          img: chirag
        }
      ].map((member, index) => (
        <div
          key={index}
          className="team-member max-w-xs w-full text-center transition-transform transform hover:scale-105 duration-700 ease-in-out"
          data-aos="fade-up"
          data-aos-delay={`${500 + index * 100}`}
          data-aos-duration="1000"
        >
          <div className="w-full h-96 flex justify-center items-center overflow-hidden rounded-lg mb-4">

              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-700"
              />
          </div>

          <h4 className="text-xl font-semibold">

              {member.name}
          </h4>
          <p className="text-gray-600">{member.role}</p>
        </div>
      ))}
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default AboutUSPage;
