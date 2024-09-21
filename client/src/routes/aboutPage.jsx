import React from "react";

const aboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About Our Real Estate Company
          </h1>
          <p className="text-lg text-gray-600">
            We are committed to helping you find the home of your dreams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Company */}
          <div className="bg-gray-100 p-8 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our company has been at the forefront of the real estate industry
              for over a decade. We believe in building trust and delivering
              quality service to help individuals and families find their ideal
              homes.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-gray-100 p-8 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to provide exceptional service, expert advice, and
              innovative solutions in the real estate industry. We aim to make
              the process of buying or selling a home as smooth and stress-free
              as possible.
            </p>
          </div>

          {/* Our Team */}
          <div className="bg-gray-100 p-8 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Team
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our team consists of dedicated professionals with extensive
              knowledge of the local market. Whether you're a first-time
              homebuyer or looking for investment opportunities, our experts are
              here to guide you every step of the way.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-100 p-8 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We would love to hear from you! If you have any questions, feel
              free to reach out to us via phone or email. Let's start your
              journey to finding your perfect home today.
            </p>
            <div className="mt-4">
              <p className="text-gray-800">Phone: (123) 456-7890</p>
              <p className="text-gray-800">Email: info@realestate.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutPage;
