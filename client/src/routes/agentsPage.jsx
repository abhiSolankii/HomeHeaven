import React from "react";

const agents = [
  {
    name: "John Doe",
    title: "Senior Real Estate Agent",
    image: "https://via.placeholder.com/150",
    description:
      "With 10+ years of experience, John specializes in luxury homes.",
  },
  {
    name: "Jane Smith",
    title: "Real Estate Agent",
    image: "https://via.placeholder.com/150",
    description:
      "Jane is passionate about helping first-time buyers find their dream homes.",
  },
  {
    name: "Michael Johnson",
    title: "Lead Commercial Agent",
    image: "https://via.placeholder.com/150",
    description:
      "Michael focuses on commercial properties in the downtown area.",
  },
];

const agentsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Meet Our Agents
          </h1>
          <p className="text-lg text-gray-600">
            Our team of dedicated professionals is here to help you find your
            dream home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <div key={index} className="bg-gray-100 p-8 shadow-md rounded-lg">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {agent.name}
              </h2>
              <h3 className="text-gray-600 mb-4 text-center">{agent.title}</h3>
              <p className="text-gray-600 text-center">{agent.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default agentsPage;
