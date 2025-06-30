import React from 'react';

export const metadata = {
  title: "About - Get Me a Chai",
};

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-purple-600">About Get Me a Chai</h1>
      <p className="text-lg mb-8">
        Get Me a Chai is a platform where creators can receive direct support from fans — as simple as buying them a cup of chai ☕. It helps you turn appreciation into funding for your next idea or project.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-purple-500">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start bg-white shadow-md rounded-lg p-4">
            <img className="w-16 h-16 rounded-full mr-4" src="/group.gif" alt="Fans collaborate" />
            <div>
              <h3 className="font-semibold mb-1">Fans Want to Collaborate</h3>
              <p className="text-gray-600">Your fans are excited to help bring your ideas to life.</p>
            </div>
          </div>
          <div className="flex items-start bg-white shadow-md rounded-lg p-4">
            <img className="w-16 h-16 rounded-full mr-4" src="/coin.gif" alt="Support" />
            <div>
              <h3 className="font-semibold mb-1">Support Through Chai</h3>
              <p className="text-gray-600">Fans show love by buying you chai, directly funding your projects.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-500">Why Creators Love Us</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <ul className="list-disc pl-4 text-gray-700 space-y-2">
              <li>Direct financial support from fans</li>
              <li>Build deeper connections with your audience</li>
              <li>Simple, creator-focused platform</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <ul className="list-disc pl-4 text-gray-700 space-y-2">
              <li>Showcase work and gain exposure</li>
              <li>Collaborate with fellow creators</li>
              <li>Access tools & resources to grow</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-500">For the Fans</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <ul className="list-disc pl-4 text-gray-700 space-y-2">
            <li>Support your favorite creators directly</li>
            <li>Receive exclusive updates and perks</li>
            <li>Be part of their creative journey</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-500">More Reasons to Join</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Collaboration & Community</h3>
            <ul className="list-disc pl-4 text-gray-700 space-y-2">
              <li>Meet and collaborate with other creators</li>
              <li>Join discussions, events, and share ideas</li>
              <li>Grow together in an inclusive space</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Resources & Recognition</h3>
            <ul className="list-disc pl-4 text-gray-700 space-y-2">
              <li>Access tutorials, tools, and guides</li>
              <li>Get featured and build your brand</li>
              <li>Expand your network and audience</li>
            </ul>
          </div>
        </div>
      </section>

      <p className="text-center text-gray-600 mt-10">
        Start sharing your journey, connect with fans, and let every cup of chai fuel your creativity!
      </p>
    </div>
  );
};

export default About;
